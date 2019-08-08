/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

const { expect } = chai;

chai.use(chaiHttp);

describe('POST /apiii', () => {
  it('should return an error message', () => {
    chai
      .request(app)
      .get('/apiii')
      .end((err, res) => {
        expect(res.status).to.equal(404);
      });
  });
});
