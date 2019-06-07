/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import * as Factory from '../../helpers/factory';
import status from '../../config/status';
import db from '../../models';
import app from '../../app';

chai.use(chaiHttp);
chai.should();
let accessToken;
let createdUser = {};

const newUser = Factory.user.build();

delete newUser.id;

describe('Reading Stats', () => {
  before(async () => {
    try {
      await db.User.destroy({
        truncate: true,
        cascade: true,
        logging: false
      });

      createdUser = (await db.User.create(newUser, { logging: false })).dataValues;
      accessToken = jwt.sign(
        { id: createdUser.id, role: createdUser.role, permissions: createdUser.permissions },
        process.env.SECRET_KEY,
        { expiresIn: '1d' }
      );
    } catch (err) {
      throw err;
    }
  });

  it('Should let the user save a reading stats', (done) => {
    chai
      .request(app)
      .post('/api/v1/user/profile/comming-to-benin-republic/stats')
      .set('access-token', accessToken)
      .end((err, res) => {
        res.should.have.status(status.OK);
        done();
      });
  });

  it('Should let the user get reading stats', (done) => {
    chai
      .request(app)
      .get('/api/v1/user/profile/stats')
      .set('access-token', accessToken)
      .end((err, res) => {
        res.should.have.status(status.OK);
        done();
      });
  });
});
