/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import * as Factory from '../../helpers/factory';
import status from '../../config/status';
import db from '../../models';
import app from '../../app';

chai.use(chaiHttp);
chai.should();

let createdUser = {};
let createdArticle = {};
let newarticleSlug;

const newUser = Factory.user.build();
const newArticle = Factory.article.build();

delete newUser.id;
delete newArticle.id;

describe('ARTICLE LIKES', () => {
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
      newArticle.userId = createdUser.id;
      createdArticle = (await db.Article.create(newArticle, { logging: false })).dataValues;
      newarticleSlug = createdArticle.slug;
    } catch (err) {
      throw err;
    }
  });
  it('Should let the user create an article like with article slug', (done) => {
    chai
      .request(app)
      .post(`/api/v1/articles/${newarticleSlug}/likes`)
      .send()
      .end((err, res) => {
        res.should.have.status(status.CREATED);
        done();
      });
  });
  it('Should not let the user like an article more than once', (done) => {
    chai
      .request(app)
      .post(`/api/v1/articles/${newarticleSlug}/likes`)
      .send()
      .end((err, res) => {
        res.should.have.status(status.BAD_REQUEST);
        done();
      });
  });

  it('Should not let the user create a article like with article slug that does not exist', (done) => {
    chai
      .request(app)
      .post(`/api/v1/articles/${newarticleSlug}i/likes`)
      .send()
      .end((err, res) => {
        res.should.have.status(status.NOT_FOUND);
        done();
      });
  });
});
