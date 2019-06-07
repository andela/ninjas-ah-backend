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

let reportId;

const newUser = Factory.user.build();
const newArticle = Factory.article.build();
const newReport = Factory.report.build();

delete newUser.id;
delete newArticle.id;
delete newReport.id;

describe('Reports', () => {
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
      await db.Report.destroy({
        truncate: true,
        cascade: true,
        logging: false
      });

      createdUser = (await db.User.create(newUser, { logging: false })).dataValues;
      newArticle.userId = createdUser.id;
      accessToken = jwt.sign(
        { id: createdUser.id, role: createdUser.role, permissions: createdUser.permissions },
        process.env.SECRET_KEY,
        { expiresIn: '1d' }
      );
      createdArticle = await db.Article.create(newArticle, { logging: false });
    } catch (err) {
      throw err;
    }
  });
  it('should let user create report', (done) => {
    chai
      .request(app)
      .post(`/api/v1/article/${createdArticle.slug}/report`)
      .set('access-token', accessToken)
      .send(newReport)
      .end((err, res) => {
        reportId = res.body.Report.id;
        res.should.have.status(status.CREATED);
        done();
      });
  });
  it('should not let user create report with wrong input', (done) => {
    newReport.title = '';
    chai
      .request(app)
      .post(`/api/v1/article/${createdArticle.slug}/report`)
      .set('access-token', accessToken)
      .send(newReport)
      .end((err, res) => {
        res.should.have.status(status.BAD_REQUEST);
        done();
      });
  });

  it('should not let user create report more than once', (done) => {
    newReport.title = 'new title';
    chai
      .request(app)
      .post(`/api/v1/article/${createdArticle.slug}/report`)
      .set('access-token', accessToken)
      .send(newReport)
      .end((err, res) => {
        res.should.have.status(status.OK);
        done();
      });
  });

  it('should let the user get the existing report', (done) => {
    chai
      .request(app)
      .get(`/api/v1/article/${createdArticle.slug}/report/${reportId}`)
      .set('access-token', accessToken)
      .send()
      .end((err, res) => {
        res.should.have.status(status.OK);
        done();
      });
  });
  it('should let user get all existing reports', (done) => {
    chai
      .request(app)
      .get(`/api/v1/article/${createdArticle.slug}/report`)
      .set('access-token', accessToken)
      .send()
      .end((err, res) => {
        res.should.have.status(status.OK);
        done();
      });
  });
  it('should not let the user delete a report that does not exist', (done) => {
    chai
      .request(app)
      .delete(`/api/v1/article/${createdArticle.slug}/report/8372736`)
      .set('access-token', accessToken)
      .send()
      .end((err, res) => {
        res.should.have.status(status.BAD_REQUEST);
        done();
      });
  });
  it('should not let the user delete a report that does not exist', (done) => {
    chai
      .request(app)
      .delete(`/api/v1/article/${createdArticle.slug}/report/${reportId}`)
      .set('access-token', accessToken)
      .send()
      .end((err, res) => {
        res.should.have.status(status.OK);
        done();
      });
  });
});
