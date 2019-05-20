/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import jwt from 'jsonwebtoken';
import chaiHttp from 'chai-http';
import app from '../../app';
import status from '../../config/status';
import db from '../../models';
import * as Factory from '../../helpers/factory';

let createdUser = '';
let token = '';

chai.should();
chai.use(chaiHttp);
const { userType, permissions } = Factory.permissionsNormal.build();

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
      await db.Permission.destroy({
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
        .send({ userType, permissions })
        .set('access-token', token)
        .end((err, res) => {
          res.status.should.equal(status.CREATED);
          res.body.should.be.an('object');
          done();
        });
    });

    it('Should return exist when permission is already created', (done) => {
      chai
        .request(app)
        .post('/api/v1/permissions')
        .send({ userType, permissions })
        .set('access-token', token)
        .end((err, res) => {
          res.status.should.equal(status.EXIST);
          res.body.should.be.an('object');
          done();
        });
    });
  });
});
