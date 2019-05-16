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
let newReportId;

const newUser = Factory.user.build();
const newArticle = Factory.article.build();
const newReport = {
  reportTitle: 'khsiskdksdcks',
  reportBody: 'kzjclkdmfswkzs',
  type: ['idishoiew']
};
delete newUser.id;
delete newArticle.id;

describe('Report an article', () => {
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

      createdUser = (await db.User.create(newUser, { logging: false })).dataValues;
      newArticle.userId = createdUser.id;
      createdArticle = (await db.Article.create(newArticle, { logging: false })).dataValues;
    } catch (err) {
      throw err;
    }
  });
  it('Should let the user create a report', (done) => {
    chai
      .request(app)
      .post(`/api/v1/articles/${createdArticle.slug}/report`)
      .send(newReport)
      .end((err, res) => {
        newReportId = res.body.Report.id;

        res.should.have.status(status.CREATED);
        done();
      });
  });
  it('Should not let the user create a report twice', (done) => {
    chai
      .request(app)
      .post(`/api/v1/articles/${createdArticle.slug}/report`)
      .send(newReport)
      .end((err, res) => {
        res.should.have.status(status.BAD_REQUEST);
        done();
      });
  });
  it('Should let the user get all report for a specific article', (done) => {
    chai
      .request(app)
      .get(`/api/v1/articles/${createdArticle.slug}/report`)
      .send()
      .end((err, res) => {
        res.should.have.status(status.OK);
        done();
      });
  });
  it('Should not let the user get reports of that does not exist', (done) => {
    chai
      .request(app)
      .get(`/api/v1/articles/${createdArticle.slug}/report/000000000`)
      .send()
      .end((err, res) => {
        res.should.have.status(status.NOT_FOUND);
        done();
      });
  });

  it('Should let the user get a specific report ', (done) => {
    chai
      .request(app)
      .get(`/api/v1/articles/${createdArticle.slug}/report/${newReportId}`)
      .send()
      .end((err, res) => {
        res.should.have.status(status.OK);
        done();
      });
  });
  it('Should not let the user delete a report that does not exist', (done) => {
    chai
      .request(app)
      .delete(`/api/v1/articles/${createdArticle.slug}/report/0000000000`)
      .send()
      .end((err, res) => {
        res.should.have.status(status.NOT_FOUND);
        done();
      });
  });
  it('Should let the user delete a report of a specific id', (done) => {
    chai
      .request(app)
      .delete(`/api/v1/articles/${createdArticle.slug}/report/${newReportId}`)
      .send()
      .end((err, res) => {
        res.should.have.status(status.OK);
        done();
      });
  });
  it('Should not let the user the get reports that do not exist', (done) => {
    chai
      .request(app)
      .get(`/api/v1/articles/${createdArticle.slug}/report`)
      .send()
      .end((err, res) => {
        res.should.have.status(status.NOT_FOUND);
        done();
      });
  });
  it('Should not let the user create with empty body', (done) => {
    newReport.reportBody = '';
    chai
      .request(app)
      .post(`/api/v1/articles/${createdArticle.slug}/report`)
      .send(newReport)
      .end((err, res) => {
        res.should.have.status(status.BAD_REQUEST);
        done();
      });
  });
});
