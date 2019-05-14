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

describe('Article dislike', () => {
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
      newArticle.userId = createdUser.id;
      createdArticle = (await db.Article.create(newArticle, { logging: false })).dataValues;
      newarticleSlug = createdArticle.slug;
    } catch (err) {
      throw err;
    }
  });
  it('Should let the user dislike an article', (done) => {
    chai
      .request(app)
      .post(`/api/v1/articles/${newarticleSlug}/dislikes`)
      .send()
      .end((err, res) => {
        res.should.have.status(status.CREATED);
        done();
      });
  });
  it('Should not let the user dislike an article more than once', (done) => {
    chai
      .request(app)
      .post(`/api/v1/articles/${newarticleSlug}/dislikes`)
      .send()
      .end((err, res) => {
        res.should.have.status(status.BAD_REQUEST);
        done();
      });
  });
  it('Should not let the user dislike an article that does not exist', (done) => {
    chai
      .request(app)
      .post(`/api/v1/articles/${newarticleSlug}i/dislikes`)
      .send()
      .end((err, res) => {
        res.should.have.status(status.NOT_FOUND);
        done();
      });
  });
});
