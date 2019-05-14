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

const like = {
  articleSlug: 1,
  userId: 1
};
let newarticleSlug;

const newUser = Factory.user.build();
const newArticle = Factory.article.build();

delete newUser.id;
delete newArticle.id;

describe('Article dislikes', () => {
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

      await db.ArticleDislike.destroy({
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
      like.articleSlug = createdArticle.slug;
      like.userId = createdUser.id;
      await db.ArticleLike.create(like, { logging: false });
      newarticleSlug = createdArticle.slug;
    } catch (err) {
      throw err;
    }
  });
  it('Should let the user dislike an article', (done) => {
    chai
      .request(app)
      .post(`/api/v1/articles/${newarticleSlug}/dislike`)
      .set('access-token', accessToken)
      .send()
      .end((err, res) => {
        res.should.have.status(status.CREATED);
        done();
      });
  });
  it('Should not let the user dislike an article more that once', (done) => {
    chai
      .request(app)
      .post(`/api/v1/articles/${newarticleSlug}/dislike`)
      .set('access-token', accessToken)
      .send()
      .end((err, res) => {
        res.should.have.status(status.BAD_REQUEST);
        done();
      });
  });
  it('Should let the user remove the dislike', (done) => {
    chai
      .request(app)
      .post(`/api/v1/articles/${newarticleSlug}/undislike`)
      .set('access-token', accessToken)
      .send()
      .end((err, res) => {
        res.should.have.status(status.CREATED);
        done();
      });
  });
  it('Should not let the user remove the dislike that does not exist', (done) => {
    chai
      .request(app)
      .post(`/api/v1/articles/${newarticleSlug}/undislike`)
      .set('access-token', accessToken)
      .send()
      .end((err, res) => {
        res.should.have.status(status.BAD_REQUEST);
        done();
      });
  });
});
