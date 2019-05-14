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
let createdComment = {};
let commentId;
let newarticleSlug;

const newUser = Factory.user.build();
const newArticle = Factory.article.build();
const newComment = Factory.comment.build();

delete newUser.id;
delete newArticle.id;
delete newComment.id;

describe('COMMENT LIKES', () => {
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
      await db.CommentLike.destroy({
        truncate: true,
        cascade: true,
        logging: false
      });
      createdUser = (await db.User.create(newUser, { logging: false })).dataValues;
      newArticle.userId = createdUser.id;
      createdArticle = (await db.Article.create(newArticle, { logging: false })).dataValues;
      newComment.articleSlug = createdArticle.slug;
      createdComment = await db.Comment.create(newComment, { logging: false });
      newarticleSlug = createdArticle.slug;
      commentId = createdComment.id;
    } catch (err) {
      throw err;
    }
  });
  it('Should let the user create a comment like', (done) => {
    chai
      .request(app)
      .post(`/api/v1/articles/${createdArticle.slug}/comments/${createdComment.id}/likes`)
      .send()
      .end((err, res) => {
        res.should.have.status(status.CREATED);
        done();
      });
  });
  it('Should not let the user create a comment like with and article slug that does not exist', (done) => {
    chai
      .request(app)
      .post(`/api/v1/articles/${createdArticle.slg}/comments/${createdComment.id}/likes`)
      .send()
      .end((err, res) => {
        res.should.have.status(status.NOT_FOUND);
        done();
      });
  });
  it('Should not let the user create a comment like again', (done) => {
    chai
      .request(app)
      .post(`/api/v1/articles/${newarticleSlug}/comments/${commentId}/likes`)
      .send()
      .end((err, res) => {
        res.should.have.status(status.OK);
        done();
      });
  });
  it('Should not let the user create a comment like with the wrong article slug', (done) => {
    chai
      .request(app)
      .post(`/api/v1/articles/rhweiudukhsbdkhbjaskjdb/comments/${createdComment.id}/likes`)
      .send()
      .end((err, res) => {
        res.should.have.status(status.NOT_FOUND);
        done();
      });
  });
  it('Should not let the user create a comment like with comment id which is a string', (done) => {
    chai
      .request(app)
      .post(`/api/v1/articles/${newarticleSlug}/comments/${createdComment.id}i/likes`)
      .send()
      .end((err, res) => {
        res.should.have.status(status.SERVER_ERROR);
        done();
      });
  });
  it('Should not let the user create a comment like with the comment id that  does not exist', (done) => {
    chai
      .request(app)
      .post(`/api/v1/articles/${newarticleSlug}/comments/342323342/likes`)
      .send()
      .end((err, res) => {
        res.should.have.status(status.NOT_FOUND);
        done();
      });
  });
});
