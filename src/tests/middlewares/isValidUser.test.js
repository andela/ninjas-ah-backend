/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import express from 'express';
import db from '../../models';
import status from '../../config/status';
import * as Factory from '../../helpers/factory';
import isActiveUser from '../../middlewares/isActiveUser';

const { expect } = chai;

chai.use(chaiHttp);

const app = express();
const router = express.Router();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);

app.use('/api/v1/auth/login', router.post('/', isActiveUser));

const newUser = Factory.user.build();
delete newUser.id;
let activeUser = '';
let inactiveUser = '';

describe('Test activated account', () => {
  before(async () => {
    try {
      await db.User.destroy({
        truncate: true,
        cascade: true,
        logging: false
      });
      newUser.isActive = true;
      activeUser = (await db.User.create(newUser, { logging: false })).dataValues;
      newUser.isActive = false;
      newUser.email = 'prince@gmail.com';
      newUser.username = 'prince';
      inactiveUser = (await db.User.create(newUser, { logging: false })).dataValues;
    } catch (error) {
      throw error;
    }
  });

  it('should return true when user is active', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({ email: activeUser.email })
      .end((err, res) => {
        expect(res.status).to.not.equal(status.UNAUTHORIZED);
        done();
      });
  });

  it('should return false when user is not active', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({ email: inactiveUser.email })
      .end((err, res) => {
        expect(res.status).to.equal(status.UNAUTHORIZED);
        done();
      });
  });

  it('should return false if the user does not exist', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'aaa@bbb.ccc' })
      .end((err, res) => {
        expect(res.status).to.equal(status.UNAUTHORIZED);
        done();
      });
  });
});
