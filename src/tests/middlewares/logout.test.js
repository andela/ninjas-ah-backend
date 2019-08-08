/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../../models';
import * as Factory from '../../helpers/factory';
import verifyToken from '../../middlewares/verifyToken';
import logout from '../../middlewares/logout';

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

app.use('/api/auth/logout', router.get('/', verifyToken, logout));
app.use('/api/auth/logout', router.get('/:token', verifyToken, logout));

describe('Logout', () => {
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

  it('should logout the user and blacklist the token', (done) => {
    chai
      .request(app)
      .get('/api/auth/logout')
      .set('access-token', token)
      .end((err, res) => {
        expect(res.body).to.not.include.keys('errors');
        done();
      });
  });

  it('should not logout the user if the user does not exist', (done) => {
    const token2 = jwt.sign({ id: 0, role: createdUser.role }, process.env.SECRET_KEY, {
      expiresIn: '1d'
    });
    chai
      .request(app)
      .get('/api/auth/logout')
      .set('access-token', token2)
      .end((err, res) => {
        expect(res.body).to.include.keys('errors');
        done();
      });
  });

  it('should not logout the user if the user does not exist', (done) => {
    const token2 = jwt.sign({ id: {}, role: createdUser.role }, process.env.SECRET_KEY, {
      expiresIn: '1d'
    });
    chai
      .request(app)
      .get('/api/auth/logout')
      .set('access-token', token2)
      .end((err, res) => {
        expect(res.body).to.include.keys('errors');
        done();
      });
  });

  it('should not logout the user if the user does not exist', (done) => {
    const token2 = jwt.sign({ id: {}, role: createdUser.role }, process.env.SECRET_KEY, {
      expiresIn: '1d'
    });
    chai
      .request(app)
      .get(`/api/auth/logout/${token2}`)
      .end((err, res) => {
        expect(res.body).to.include.keys('errors');
        done();
      });
  });
});
