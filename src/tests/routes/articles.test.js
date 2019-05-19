/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../../models';
import status from '../../config/status';
import * as Factory from '../../helpers/factory';
import app from '../../app';

dotenv.config();

const { expect } = chai;

let accessToken = '';
let createdUser = '';
let createdArticle = '';

const user = Factory.user.build();
const article = Factory.article.build();

delete user.id;
delete article.id;

describe('Bookmark article', () => {
  before(async () => {
    try {
      await db.User.destroy({
        truncate: true,
        cascade: true,
        logging: false
      });
      createdUser = (await db.User.create(user, { logging: false })).dataValues;
      article.userId = createdUser.id;
      accessToken = jwt.sign(
        { id: createdUser.id, role: createdUser.role, permissions: createdUser.permissions },
        process.env.SECRET_KEY,
        { expiresIn: '1d' }
      );
      createdArticle = (await db.Article.create(article, { logging: false })).dataValues;
    } catch (error) {
      throw error;
    }
  });

  // bookmark an article
  it('should bookmark an article', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/articles/${createdArticle.slug}/bookmark`)
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.CREATED);
        expect(res.body).to.not.include.keys('errors');
        done();
      });
  });

  it('should not bookmark an article if it has already been bookmarked by the same user', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/articles/${createdArticle.slug}/bookmark`)
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.EXIST);
        expect(res.body).to.include.keys('errors');
        done();
      });
  });

  it('should not bookmark an article if the user is not authenticated', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/articles/${createdArticle.slug}/bookmark`)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.UNAUTHORIZED);
        expect(res.body).to.include.keys('errors');
        done();
      });
  });

  it("should not bookmark an article if the user doesn't exist", (done) => {
    const invalidUserAccessToken = jwt.sign(
      { id: 0, role: createdUser.role, permissions: createdUser.permissions },
      process.env.SECRET_KEY,
      { expiresIn: '1d' }
    );
    chai
      .request(app)
      .patch(`/api/v1/articles/${createdArticle.slug}/bookmark`)
      .set('access-token', invalidUserAccessToken)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.UNAUTHORIZED);
        expect(res.body).to.include.keys('errors');
        done();
      });
  });

  it('should throw an error', (done) => {
    const invalidUserAccessToken = jwt.sign(
      { id: {}, role: createdUser.role, permissions: createdUser.permissions },
      process.env.SECRET_KEY,
      { expiresIn: '1d' }
    );
    chai
      .request(app)
      .patch(`/api/v1/articles/${createdArticle.slug}/bookmark`)
      .set('access-token', invalidUserAccessToken)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.SERVER_ERROR);
        expect(res.body).to.include.keys('errors');
        done();
      });
  });

  // get bookmarked articles
  it('should get all bookmarked articles', (done) => {
    chai
      .request(app)
      .get('/api/v1/articles/bookmarked')
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.OK);
        expect(res.body).to.not.include.keys('errors');
        done();
      });
  });

  it('should not get all bookmarked articles if the user is not authenticated', (done) => {
    chai
      .request(app)
      .get('/api/v1/articles/bookmarked')
      .end((err, res) => {
        expect(res.status).to.be.equal(status.UNAUTHORIZED);
        expect(res.body).to.include.keys('errors');
        done();
      });
  });

  it('should throw an error', (done) => {
    const invalidUserAccessToken = jwt.sign(
      { id: {}, role: createdUser.role, permissions: createdUser.permissions },
      process.env.SECRET_KEY,
      { expiresIn: '1d' }
    );
    chai
      .request(app)
      .get('/api/v1/articles/bookmarked')
      .set('access-token', invalidUserAccessToken)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.SERVER_ERROR);
        expect(res.body).to.include.keys('errors');
        done();
      });
  });

  // delete bookmarked articles
  it('should delete a bookmark', (done) => {
    chai
      .request(app)
      .delete(`/api/v1/articles/${createdArticle.slug}/bookmark`)
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.OK);
        expect(res.body).to.not.include.keys('errors');
        done();
      });
  });

  it('should not delete a bookmark if it has already been deleted by the same user', (done) => {
    chai
      .request(app)
      .delete(`/api/v1/articles/${createdArticle.slug}/bookmark`)
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.BAD_REQUEST);
        expect(res.body).to.include.keys('errors');
        done();
      });
  });

  it('should not delete a bookmark if the user is not authenticated', (done) => {
    chai
      .request(app)
      .delete(`/api/v1/articles/${createdArticle.slug}/bookmark`)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.UNAUTHORIZED);
        expect(res.body).to.include.keys('errors');
        done();
      });
  });

  it('should throw an error', (done) => {
    const invalidUserAccessToken = jwt.sign(
      { id: {}, role: createdUser.role, permissions: createdUser.permissions },
      process.env.SECRET_KEY,
      { expiresIn: '1d' }
    );
    chai
      .request(app)
      .delete(`/api/v1/articles/${createdArticle.slug}/bookmark`)
      .set('access-token', invalidUserAccessToken)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.SERVER_ERROR);
        expect(res.body).to.include.keys('errors');
        done();
      });
  });

  // share an article
  it('should share an article on facebook', (done) => {
    chai
      .request(app)
      .get(`/api/v1/articles/${createdArticle.slug}/share/facebook`)
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.OK);
        done();
      });
  });

  it('should share an article on twitter', (done) => {
    chai
      .request(app)
      .get(`/api/v1/articles/${createdArticle.slug}/share/twitter`)
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.OK);
        done();
      });
  });

  it('should share an article on linkedin', (done) => {
    chai
      .request(app)
      .get(`/api/v1/articles/${createdArticle.slug}/share/linkedin`)
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.OK);
        done();
      });
  });

  it('should share an article on gmail', (done) => {
    chai
      .request(app)
      .get(`/api/v1/articles/${createdArticle.slug}/share/gmail`)
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.OK);
        done();
      });
  });
});
