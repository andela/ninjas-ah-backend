/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import express from 'express';
import status from '../../config/status';
import * as Factory from '../../helpers/factory';
import asyncHandler from '../../middlewares/asyncHandler';

chai.use(chaiHttp);

const app = express();
const router = express.Router();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);

app.use('/api/v1/asyncHandler/', router.get('/', asyncHandler('error')));

const newUser = Factory.user.build();
const newArticle = Factory.article.build();
const newComment = Factory.comment.build();

delete newUser.id;
delete newArticle.id;
delete newComment.id;

describe('MIDDLEWARE : Test the asyncHandler middleware', () => {
  it('Should check the error', (done) => {
    chai
      .request(app)
      .get('/api/v1/asyncHandler')
      .end((err, res) => {
        res.should.have.status(status.CREATED);
        done();
      });
  });
});
