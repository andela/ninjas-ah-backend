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
    } catch (err) {
      throw err;
    }
  });
  it('Should let the user dislike an article ', (done) => {
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
  it('Should not let the user dislike an article more than once', (done) => {
    chai
      .request(app)
      .post(`/api/v1/articles/${newarticleSlug}/dislike`)
      .set('access-token', accessToken)
      .send()
      .end((err, res) => {
        res.should.have.status(status.OK);
        done();
      });
  });
  it('Should let the user like an article', (done) => {
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
        res.should.have.status(status.OK);
        done();
      });
  });

  it('Should let the user like an article once he deleted the like', (done) => {
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
  it('Should let the user dislike an article', (done) => {
    chai
      .request(app)
      .post(`/api/v1/articles/${newarticleSlug}/dislike`)
      .set('access-token', accessToken)
      .send()
      .end((err, res) => {
        res.should.have.status(status.OK);
        done();
      });
  });
  it('Should let a user see who disliked on article ', (done) => {
    chai
      .request(app)
      .get(`/api/v1/articles/${newarticleSlug}/likes`)
      .set('access-token', accessToken)
      .send()
      .end((err, res) => {
        res.should.have.status(status.OK);
        done();
      });
  });
  it('Should let the user change their reaction on an article ', (done) => {
    chai
      .request(app)
      .post(`/api/v1/articles/${newarticleSlug}/like`)
      .set('access-token', accessToken)
      .send()
      .end((err, res) => {
        res.should.have.status(status.OK);
        done();
      });
  });
  it('Should let a user see who liked on article ', (done) => {
    chai
      .request(app)
      .get(`/api/v1/articles/${newarticleSlug}/likes`)
      .set('access-token', accessToken)
      .send()
      .end((err, res) => {
        res.should.have.status(status.OK);
        done();
      });
  });
});
