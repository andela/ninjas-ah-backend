/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import jwt from 'jsonwebtoken';
import chaiHttp from 'chai-http';
import app from '../../app';
import status from '../../config/status';
import db from '../../models';
import * as Factory from '../../helpers/factory';
import { normal } from '../../config/permissions';

let createdUser = '';
let token = '';

chai.should();
chai.use(chaiHttp);
const permissions = Factory.user.build();
delete permissions.id;

const user = Factory.user.build();
delete user.id;

describe('Permission tests', () => {
  // test signup;
  before(async () => {
    try {
      await db.User.destroy({
        truncate: true,
        cascade: true,
        logging: false
      });
      createdUser = (await db.User.create(user, { logging: false })).dataValues;
      token = jwt.sign(
        { id: createdUser.id, role: createdUser.role, permissions: user.permissions },
        process.env.SECRET_KEY,
        {
          expiresIn: '1d'
        }
      );
    } catch (error) {
      throw error;
    }
  });
  describe('Create permission', () => {
    it('Should create new Permission', (done) => {
      chai
        .request(app)
        .post('/api/v1/permissions')
        .send({ userType: 'normal', permissions: permissions.normal })
        .set('access-token', token)
        .end((err, res) => {
          res.status.should.equal(status.CREATED);
          res.body.should.be.an('object');
          done();
        });
    });
  });
});
