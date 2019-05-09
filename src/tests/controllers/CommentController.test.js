/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import express from 'express';
import status from '../../config/status';
import db from '../../models';
import * as Factory from '../../helpers/factory';
import CommentController from '../../controllers/CommentController';

const { expect } = chai;

chai.use(chaiHttp);

const app = express();
const router = express.Router();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);

app.use('/api/v1/articles/111111111/comments', router.post('/', CommentController.create));

const createdUser = {};

const newUser = Factory.user.build();
const newArticle = Factory.article.build();
const newComment = Factory.comment.build();

delete newUser.id;
delete newArticle.id;
delete newComment.id;

describe('COMMENTS', () => {
  it('Should not let the user create a comment with a bad request', (done) => {
    newComment.userId = createdUser.id;
    chai
      .request(app)
      .post('/api/v1/articles/111111111/comments')
      .send({
        articleId: {},
        userId: {},
        body: {}
      })
      .end((err, res) => {
        res.should.have.status(status.SERVER_ERROR);
        done();
      });
  });
});
