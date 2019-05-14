/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import * as Factory from '../../../helpers/factory';
import status from '../../../config/status';
import db from '../../../models';
import app from '../../../app';

chai.use(chaiHttp);
chai.should();

let createdUser = {};
let createdArticle = {};
let createdComment = {};

const newUser = Factory.user.build();
const newArticle = Factory.article.build();
const newComment = Factory.comment.build();
delete newUser.id;
delete newComment.id;

describe('LIKES FOR COMMENTS', () => {
  before(async () => {
    try {
      await db.User.destroy({
        truncate: true,
        cascade: true,
        logging: false
      });
      await db.CommentLike.destroy({
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
      createdArticle = (await db.Article.create(newArticle, { logging: false })).dataValues;
      newComment.userId = createdUser.id;
      newComment.articleId = createdArticle.id;

      createdComment = (await db.Comment.create(newComment, { logging: false })).dataValues;

      await chai
        .request(app)
        .post(`/api/v1/comments/${createdComment.id}/likes`)
        .set('Content-Type', 'application/json')
        .send();
    } catch (err) {
      throw err;
    }
  });

  it('Should not let the user like a comment with the wrogn path', (done) => {
    newComment.userId = createdUser.id;
    chai
      .request(app)
      .post('/api/v1/comments/fgdzsdzfdhf/likes')
      .send()
      .end((err, res) => {
        res.should.have.status(status.SERVER_ERROR);
        done();
      });
  });
  it('Should let the user like a comment with the wrong comment id', (done) => {
    newComment.userId = createdUser.id;
    chai
      .request(app)
      .post('/api/v1/comments/928393/likes')
      .send()
      .end((err, res) => {
        res.should.have.status(status.NOT_FOUND);
        done();
      });
  });

  it('Should not let the user with a body', (done) => {
    newComment.userId = createdUser.id;
    chai
      .request(app)
      .post(`/api/v1/comments/${createdComment.id}/likes`)
      .send('~~~')
      .end((err, res) => {
        res.should.have.status(status.NOT_FOUND);
        done();
      });
  });
});
