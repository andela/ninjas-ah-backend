/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import status from '../../config/status';
import app from '../../app';

const { expect } = chai;

chai.use(chaiHttp);

describe('GET /api/v1/auth/logout', () => {
  it('should log out the user', () => {
    chai
      .request(app)
      .get('/api/v1/auth/logout')
      .end((err, res) => {
        expect(res.status).to.equal(status.OK);
      });
  });
});
