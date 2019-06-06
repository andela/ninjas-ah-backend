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
let createdEdit;
let editId;

const newUser = Factory.user.build();
const newArticle = Factory.article.build();
const newComment = Factory.comment.build();
const newEdit = Factory.editComment.build();

delete newUser.id;
delete newArticle.id;
delete newComment.id;
delete newEdit.id;

describe('COMMENT EDITS', () => {
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
      await db.CommentEdit.destroy({
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
      newEdit.articleSlug = createdArticle.slug;
      newEdit.userId = createdUser.id;
      newEdit.commentId = createdComment.id;
      createdEdit = await db.CommentEdit.create(newEdit, { logging: false });
      editId = createdEdit.id;
      newarticleSlug = createdArticle.slug;
      commentId = createdComment.id;
    } catch (err) {
      throw err;
    }
  });
  it('Should let the user create a comment', (done) => {
    const comment = {
      body: 'the edit comment'
    };
    chai
      .request(app)
      .post(`/api/v1/articles/${newarticleSlug}/comments`)
      .set('access-token', accessToken)
      .send(comment)
      .end((err, res) => {
        newarticleSlug = res.body.comment.articleSlug;
        commentId = res.body.comment.id;
        res.should.have.status(status.CREATED);
        done();
      });
  });
  it('Should let the user get only the comment when it is not edited', (done) => {
    chai
      .request(app)
      .get(`/api/v1/articles/${newarticleSlug}/comments/${commentId}/edits`)
      .set('access-token', accessToken)
      .send()
      .end((err, res) => {
        res.should.have.status(status.OK);
        done();
      });
  });
  it('Should let the user edit a comment', (done) => {
    const comment = {
      body: 'the edit comment'
    };
    chai
      .request(app)
      .patch(`/api/v1/articles/${newarticleSlug}/comments/${commentId}`)
      .set('access-token', accessToken)
      .send(comment)
      .end((err, res) => {
        res.should.have.status(status.OK);
        done();
      });
  });
  it('Should let the user get the list of all edited comment', (done) => {
    chai
      .request(app)
      .get(`/api/v1/articles/${newarticleSlug}/comments/${commentId}/edits`)
      .set('access-token', accessToken)
      .send()
      .end((err, res) => {
        res.should.have.status(status.OK);
        done();
      });
  });
  it('Should let the user get the list of all edited comment', (done) => {
    chai
      .request(app)
      .get(`/api/v1/articles/${newarticleSlug}/comments/${commentId}/edits`)
      .set('access-token', accessToken)
      .send()
      .end((err, res) => {
        res.should.have.status(status.OK);
        done();
      });
  });
  it('Should not let the user delete a comment that does not exist', (done) => {
    chai
      .request(app)
      .delete(`/api/v1/articles/${newarticleSlug}/comments/${commentId}/edits/0000`)
      .set('access-token', accessToken)
      .send()
      .end((err, res) => {
        res.should.have.status(status.NOT_FOUND);
        done();
      });
  });
  it('Should let the user delete a comment from edit history', (done) => {
    chai
      .request(app)
      .delete(`/api/v1/articles/${newarticleSlug}/comments/${commentId}/edits/${editId}`)
      .set('access-token', accessToken)
      .send()
      .end((err, res) => {
        res.should.have.status(status.OK);
        done();
      });
  });
});
