/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../../models';
import status from '../../config/status';
import * as Factory from '../../helpers/factory';
import verifyToken from '../../middlewares/verifyToken';
import verifyAdminUser from '../../middlewares/verifyAdmin';

dotenv.config();

const { expect } = chai;

chai.use(chaiHttp);

const app = express();
const router = express.Router();
let createdUser = '';
let token = '';
const user = Factory.user.build();
delete user.id;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);

app.use('/api/users/roles', router.get('/', verifyToken, verifyAdminUser));

const newUser = Factory.user.build();
delete newUser.id;

describe('Verify admin', () => {
  before(async () => {
    try {
      await db.User.destroy({
        truncate: true,
        cascade: true,
        logging: false
      });
      createdUser = (await db.User.create(user, { logging: false })).dataValues;
      token = jwt.sign({ id: createdUser.id, role: createdUser.role }, process.env.SECRET_KEY, {
        expiresIn: '1d'
      });
    } catch (error) {
      throw error;
    }
  });

  it('should return a permission ', (done) => {
    chai
      .request(app)
      .get('/api/users/roles')
      .set('access-token', token)
      .end((err, res) => {
        expect(res.body).to.not.include.keys('errors');
        done();
      });
  });

  it('should return a permission denied status code if the user is not an admin', (done) => {
    const invalidUserAccessToken = jwt.sign(
      { id: 0, role: createdUser.role, permissions: createdUser.permissions },
      process.env.SECRET_KEY,
      { expiresIn: '1d' }
    );
    chai
      .request(app)
      .get('/api/users/roles')
      .set('access-token', invalidUserAccessToken)
      .end((err, res) => {
        expect(res.status).to.equal(status.ACCESS_DENIED);
        done();
      });
  });
});
