/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import * as Factory from '../../helpers/factory';
import status from '../../config/status';
import db from '../../models';
import app from '../../app';

chai.use(chaiHttp);
chai.should();
let accessToken;
let createdUser = {};
let createdArticle = {};
let newarticleSlug;
const dislike = {
  articleSlug: 1,
  userId: 1
};

const newUser = Factory.user.build();
const newArticle = Factory.article.build();

delete newUser.id;
delete newArticle.id;

describe('Article likes', () => {
  before(async () => {
    try {
      await db.User.destroy({
        truncate: true,
        cascade: true,
        logging: false
      });
      await db.Article.destroy({
        truncate: true,
        cascade: true,
        logging: false
      });

      await db.ArticleLike.destroy({
        truncate: true,
        cascade: true,
        logging: false
      });

      createdUser = (await db.User.create(newUser, { logging: false })).dataValues;
      accessToken = jwt.sign(
        { id: createdUser.id, role: createdUser.role, permissions: createdUser.permissions },
        process.env.SECRET_KEY,
        { expiresIn: '1d' }
      );
      newArticle.userId = createdUser.id;
      createdArticle = (await db.Article.create(newArticle, { logging: false })).dataValues;
      newarticleSlug = createdArticle.slug;
      dislike.articleSlug = createdArticle.slug;
      dislike.userId = createdUser.id;
      await db.ArticleDislike.create(dislike, { logging: false });
    } catch (err) {
      throw err;
    }
  });
  it('Should let the user create an article like with article slug', (done) => {
    chai
      .request(app)
      .post(`/api/v1/articles/${newarticleSlug}/like`)
      .set('access-token', accessToken)
      .send()
      .end((err, res) => {
        res.should.have.status(status.CREATED);
        done();
      });
  });
  it('Should not let the user like an article more than once', (done) => {
    chai
      .request(app)
      .post(`/api/v1/articles/${newarticleSlug}/like`)
      .set('access-token', accessToken)
      .send()
      .end((err, res) => {
        res.should.have.status(status.BAD_REQUEST);
        done();
      });
  });
  it('Should let the user remove the like ', (done) => {
    chai
      .request(app)
      .post(`/api/v1/articles/${newarticleSlug}/unlike`)
      .set('access-token', accessToken)
      .send()
      .end((err, res) => {
        res.should.have.status(status.CREATED);
        done();
      });
  });
  it('Should not let the user remove the like that does not exist ', (done) => {
    chai
      .request(app)
      .post(`/api/v1/articles/${newarticleSlug}/unlike`)
      .set('access-token', accessToken)
      .send()
      .end((err, res) => {
        res.should.have.status(status.BAD_REQUEST);
        done();
      });
  });
});
