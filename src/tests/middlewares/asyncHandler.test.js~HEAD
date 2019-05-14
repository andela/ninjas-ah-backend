/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import express from 'express';
import asyncHandler from '../../middlewares/asyncHandler';
import ArticleController from '../controllers';

chai.use(chaiHttp);

const app = express();
const router = express.Router();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);

app.use('/asyncHandler()/fail', router.get('/', asyncHandler('...')));

describe('Error catcher', () => {
  it('should error catcher middleware', (done) => {
    chai
      .request(app)
      .get('/asyncHandler/fail')
      .end((err, res) => {
        chai.expect(res.status).to.equal(500);
        chai.expect(res.body).to.include.keys('message');
        done();
      });
  });
});
