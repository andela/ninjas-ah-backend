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
let articleSlug;

const newUser = Factory.user.build();
const newArticle = Factory.article.build();
const newComment = Factory.comment.build();

delete newUser.id;
delete newArticle.id;
delete newComment.id;

describe('Comments edits', () => {
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
      createdUser = await db.User.create(newUser, { logging: false });
      newArticle.userId = createdUser.id;
      createdArticle = await db.Article.create(newArticle, { logging: false });
      newComment.articleSlug = createdArticle.slug;
      createdComment = await db.Comment.create(newComment, { logging: false });
      articleSlug = createdComment.articleSlug;
      commentId = createdComment.id;
    } catch (err) {
      throw err;
    }
  });
  it('Should let the user get a comment with that has not been edited yet', (done) => {
    chai
      .request(app)
      .get(`/api/v1/articles/${articleSlug}/comments/${commentId}/edits`)
      .send()
      .end((err, res) => {
        res.should.have.status(status.OK);
        done();
      });
  });
  it('Should let the user edit a comment', (done) => {
    const comment = {
      body: 'this is an edit'
    };
    chai
      .request(app)
      .put(`/api/v1/articles/${articleSlug}/comments/${commentId}`)
      .send(comment)
      .end((err, res) => {
        res.should.have.status(status.OK);
        done();
      });
  });
  it('Should let the user get history of all versions of edits of a comment', (done) => {
    chai
      .request(app)
      .get(`/api/v1/articles/${articleSlug}/comments/${commentId}/edits`)
      .send()
      .end((err, res) => {
        res.should.have.status(status.OK);
        done();
      });
  });
});
