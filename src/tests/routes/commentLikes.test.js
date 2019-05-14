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
let createdComment = {};
let commentId;
let newarticleSlug;

const newUser = Factory.user.build();
const newArticle = Factory.article.build();
const newComment = Factory.comment.build();

delete newUser.id;
delete newArticle.id;
delete newComment.id;

describe('Comment likes', () => {
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
      await db.Comment.destroy({
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

      newComment.articleSlug = createdArticle.slug;
      createdComment = await db.Comment.create(newComment, { logging: false });
      newarticleSlug = createdComment.articleSlug;
      commentId = createdComment.id;
    } catch (err) {
      throw err;
    }
  });
  it('Should let the user create a comment like', (done) => {
    chai
      .request(app)
      .post(`/api/v1/articles/${newarticleSlug}/comments/${createdComment.id}/like`)
      .set('access-token', accessToken)
      .send()
      .end((err, res) => {
        res.should.have.status(status.CREATED);
        done();
      });
  });
  it('Should not let the user create a comment like with and article slug that does not exist', (done) => {
    chai
      .request(app)
      .post(`/api/v1/articles/${createdArticle.slg}/comments/${createdComment.id}/like`)
      .set('access-token', accessToken)
      .send()
      .end((err, res) => {
        res.should.have.status(status.NOT_FOUND);
        done();
      });
  });
  it('Should not let the user create a comment like again', (done) => {
    chai
      .request(app)
      .post(`/api/v1/articles/${newarticleSlug}/comments/${commentId}/like`)
      .set('access-token', accessToken)
      .send()
      .end((err, res) => {
        res.should.have.status(status.OK);
        done();
      });
  });
  it('Should let the user unlike a comment', (done) => {
    chai
      .request(app)
      .post(`/api/v1/articles/${newarticleSlug}/comments/${commentId}/unlike`)
      .set('access-token', accessToken)
      .send()
      .end((err, res) => {
        res.should.have.status(status.OK);
        done();
      });
  });
  it('Should not let the user unlike a comment twice', (done) => {
    chai
      .request(app)
      .post(`/api/v1/articles/${newarticleSlug}/comments/${commentId}/unlike`)
      .set('access-token', accessToken)
      .send()
      .end((err, res) => {
        res.should.have.status(status.OK);
        done();
      });
  });
});
