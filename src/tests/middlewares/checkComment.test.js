/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import express from 'express';
import db from '../../models';
import status from '../../config/status';
import * as Factory from '../../helpers/factory';
import checkComment from '../../middlewares/checkComment';

chai.use(chaiHttp);

const app = express();
const router = express.Router();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);

app.use('/api/v1/articles/', router.post('/:articleSlug/comments', checkComment));
app.use('/api/v1/articles/', router.put('/:articleSlug/comments/:id', checkComment));
app.use('/api/v1/articles/', router.delete('/:articleSlug/comments/:id', checkComment));

let createdUser = {};
let createdArticle = {};
let createdComment = {};

let newarticleSlug;

const newUser = Factory.user.build();
const newArticle = Factory.article.build();
const newComment = Factory.comment.build();

delete newUser.id;
delete newArticle.id;
delete newComment.id;

describe('MIDDLEWARE : Check if the comment exist', () => {
  before(async () => {
    try {
      await db.User.destroy({
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
    } catch (err) {
      throw err;
    }
  });
  it('Should not continue with a wrong comment Id', (done) => {
    chai
      .request(app)
      .put(`/api/v1/articles/${newarticleSlug}/comments/h`)
      .send({
        body: 'They called me here'
      })
      .end((err, res) => {
        createdComment = res.body;
        res.should.have.status(status.SERVER_ERROR);
        done();
      });
  });

  it('Should not continue with a comment Id that does not exist ', (done) => {
    chai
      .request(app)
      .put(`/api/v1/articles/${newarticleSlug}/comments/000`)
      .send({
        body: 'They called me here'
      })
      .end((err, res) => {
        createdComment = res.body;
        res.should.have.status(status.BAD_REQUEST);
        done();
      });
  });
});
