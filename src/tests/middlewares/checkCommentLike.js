/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import express from 'express';
import status from '../../config/status';
import * as Factory from '../../helpers/factory';
import checkCommentLike from '../../middlewares/checkCommentLike';

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

app.use('/api/v1/comments/748734/likes', router.post('/', checkCommentLike));

const createdUser = {};

const newUser = Factory.user.build();
const newComment = Factory.comment.build();

delete newUser.id;
delete newComment.id;

describe('COMMENTS@@@@@@@@@@@@@@@', () => {
  it('Should not let the user continue with wrong input', (done) => {
    newComment.userId = createdUser.id;
    chai
      .request(app)
      .post('/api/v1/comments/sfggdhgshds/likes')
      .send()
      .end((err, res) => {
        res.should.have.status(status.SERVER_ERROR);
        done();
      });
  });
});
