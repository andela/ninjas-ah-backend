/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import express from 'express';
import checkComment from '../middlewares/checkElements/checkComment';

chai.use(chaiHttp);

const app = express();
const router = express.Router();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);

app.use('/api/v1', router.get('/:articleId/comments/:id', checkComment));

describe('Check Comment', () => {
  it('should return an error message', (done) => {
    chai
      .request(app)
      .get('/api/v1/1000/comments/1000')
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('should return an error message', (done) => {
    chai
      .request(app)
      .get('/api/v1/1000/comments/~~~')
      .end((err, res) => {
        res.should.have.status(500);
        done();
      });
  });
});
