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

app.use('/api/users', router.get('/', verifyToken));
app.use('/api/users', router.get('/:token', verifyToken));

describe('Verify token', () => {
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
      await db.Token.create({ token, userId: createdUser.id }, { logging: false });
    } catch (error) {
      throw error;
    }
  });

  it('should return the decoded token is valid', (done) => {
    chai
      .request(app)
      .get(`/api/users/${Factory.token.build().token}`)
      .end((err, res) => {
        expect(res.body).to.not.include.keys('errors');
        done();
      });
  });

  it('should return the decoded token is valid', (done) => {
    chai
      .request(app)
      .get('/api/users')
      .set('access-token', Factory.token.build().token)
      .end((err, res) => {
        expect(res.body).to.not.include.keys('errors');
        done();
      });
  });

  it('should return an unauthorized status code if the token is blacklisted', (done) => {
    chai
      .request(app)
      .get('/api/users')
      .set('access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(status.UNAUTHORIZED);
        expect(res.body).to.include.keys('errors');
        done();
      });
  });

  it('should return an unauthorized status code if the token is not provided', (done) => {
    chai
      .request(app)
      .get('/api/users')
      .end((err, res) => {
        expect(res.status).to.equal(status.UNAUTHORIZED);
        expect(res.body).to.include.keys('errors');
        done();
      });
  });

  it('should return an unauthorized status code the token is not valid', (done) => {
    chai
      .request(app)
      .get('/api/users')
      .set('access-token', 'invalid-token')
      .end((err, res) => {
        expect(res.status).to.equal(status.UNAUTHORIZED);
        expect(res.body).to.include.keys('errors');
        done();
      });
  });
});
