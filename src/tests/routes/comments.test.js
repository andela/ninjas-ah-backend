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

describe('COMMENTS', () => {
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
      createdArticle = (await db.Article.create(newArticle, { logging: false })).dataValues;

      newComment.articleSlug = createdArticle.slug;
      createdComment = await db.Comment.create(newComment, { logging: false });
      newarticleSlug = createdComment.articleSlug;
      commentId = createdComment.id;
    } catch (err) {
      throw err;
    }
  });
  it('Should let the user create a comment', (done) => {
    chai
      .request(app)
      .post(`/api/v1/articles/${createdComment.articleSlug}/comments`)
      .send({
        body: 'They called me here'
      })
      .end((err, res) => {
        res.should.have.status(status.CREATED);
        done();
      });
  });

  it('Should not let the user create a comment with the invalid inputs in body', (done) => {
    newComment.userId = createdUser.id;
    chai
      .request(app)
      .post(`/api/v1/articles/${createdArticle.slug}/comments`)
      .send('~~~')
      .end((err, res) => {
        res.should.have.status(status.BAD_REQUEST);
        done();
      });
  });

  it('Should not let the user create a comment with a article slug which does not exist', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles/dhbdjhfbjd/comments')
      .send(newComment)
      .end((err, res) => {
        createdComment = res.body;
        res.should.have.status(status.BAD_REQUEST);
        done();
      });
  });

  it('should get all comments of a specific article', (done) => {
    chai
      .request(app)
      .get(`/api/v1/articles/${createdArticle.slug}/comments`)
      .end((error, res) => {
        res.should.have.status(status.OK);
        done();
      });
  });

  it('Should not let the user get all comments with the wrong article slug', (done) => {
    chai
      .request(app)
      .get('/api/v1/articles/djbdfkjsdsfsd/comments')
      .end((error, res) => {
        res.should.have.status(status.NOT_FOUND);
        done();
      });
  });

  it('Should not let the user get all comments with the wrong article slug', (done) => {
    chai
      .request(app)
      .get('/jjjjj')
      .end((error, res) => {
        res.should.have.status(status.NOT_FOUND);
        done();
      });
  });

  it('Should not let the user edit a comment with a wrong article slug', (done) => {
    const comment = {
      body: 'Take test'
    };
    chai
      .request(app)
      .put('/api/v1/articles/cfjkvndfsds/comments/5')
      .send(comment)
      .end((err, res) => {
        res.should.have.status(status.NOT_FOUND);
        done();
      });
  });
  it('Should not let the user edit a comment with a wrong wrong input', (done) => {
    chai
      .request(app)
      .put(`/api/v1/articles/${newarticleSlug}/comments/57647634`)
      .send(newComment)
      .end((err, res) => {
        res.should.have.status(status.BAD_REQUEST);
        done();
      });
  });
  it('Should let the user edit a comment', (done) => {
    const comment = {
      body: 'Take test'
    };
    chai
      .request(app)
      .put(`/api/v1/articles/${newarticleSlug}/comments/${commentId}`)
      .send(comment)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('Should not let the user delete a comment with a wrong article slug', (done) => {
    chai
      .request(app)
      .delete('/api/v1/articles/kjscofljos;fj/comments/1')
      .send(newComment)
      .end((err, res) => {
        res.should.have.status(status.NOT_FOUND);
        done();
      });
  });
  it('Should not let the user delete a comment with a comment Id that does not exist', (done) => {
    chai
      .request(app)
      .delete(`/api/v1/articles/$${newarticleSlug}/comments/57647634`)
      .send(newComment)
      .end((err, res) => {
        res.should.have.status(status.NOT_FOUND);
        done();
      });
  });
  it('Should let the user delete a comment', (done) => {
    chai
      .request(app)
      .delete(`/api/v1/articles/${newarticleSlug}/comments/${commentId}`)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
