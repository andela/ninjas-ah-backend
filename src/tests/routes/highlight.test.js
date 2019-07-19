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
let createdHighlight = {};
let highlightId;
let newArticleSlug;

const newUser = Factory.user.build();
const newArticle = Factory.article.build();
const newHighlight = Factory.highlight.build();

delete newUser.id;
delete newArticle.id;
delete newHighlight.id;

describe('Highlight on Article', () => {
  before(async () => {
    try {
      await db.User.destroy({
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
      createdArticle = (await db.Article.create(newArticle, { logging: false })).dataValues;
      newHighlight.userId = createdArticle.userId;
      newHighlight.articleSlug = createdArticle.slug;
      createdHighlight = await db.Highlight.create(newHighlight, { logging: false });
      newArticleSlug = createdHighlight.articleSlug;
      highlightId = createdHighlight.id;
    } catch (err) {
      throw err;
    }
  });

  it('Should let the user create a highlight', (done) => {
    chai
      .request(app)
      .post(`/api/v1/${newArticleSlug}/highlights`)
      .set('access-token', accessToken)
      .send({
        anchorKey: 'anchorKey',
        highlightedText: 'on sera ensemble bientotssssss',
        startIndex: 0,
        stopIndex: 30,
        comment: 'welcomme to the party'
      })
      .end((err, res) => {
        res.should.have.status(status.CREATED);
        done();
      });
  });

  it('Should not let the user create highlight with the invalid inputs in body', (done) => {
    newHighlight.userId = createdUser.id;
    chai
      .request(app)
      .post(`/api/v1/${newArticleSlug}/highlights`)
      .set('access-token', accessToken)
      .send('_____')
      .end((err, res) => {
        res.should.have.status(status.BAD_REQUEST);
        done();
      });
  });

  it('Should return bad request when the highlighted text does not match with start and end index', (done) => {
    chai
      .request(app)
      .post(`/api/v1/${newArticleSlug}/highlights`)
      .set('access-token', accessToken)
      .send({
        anchorKey: 'anchorKey',
        highlightedText: 'on sera ensemble bientotssssss',
        startIndex: 0,
        stopIndex: 39,
        comment: 'welcomme to the party'
      })
      .end((err, res) => {
        res.should.have.status(status.BAD_REQUEST);
        done();
      });
  });

  it('should get all highlight of a specific article', (done) => {
    chai
      .request(app)
      .get(`/api/v1/${newArticleSlug}/highlights`)
      .set('access-token', accessToken)
      .end((error, res) => {
        res.should.have.status(status.OK);
        done();
      });
  });

  it('Should let the user delete a highlight', (done) => {
    chai
      .request(app)
      .delete(`/api/v1/${newArticleSlug}/highlights/${highlightId}`)
      .set('access-token', accessToken)
      .end((err, res) => {
        res.should.have.status(status.OK);
        done();
      });
  });
});
