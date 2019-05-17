/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import express from 'express';
import status from '../../config/status';
import db from '../../models';
import * as Factory from '../../helpers/factory';
import AuthPassportController from '../../controllers/AuthPassportController';

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

app.use('/api/v1/auth', router.post('/', AuthPassportController.loginOrSignup));

const userFacebook = Factory.userFacebook.build();
const userTwitter = Factory.userTwitter.build();
const userGoogle = Factory.userGoogle.build();

describe('Passport Authentication controller', () => {
  before(async () => {
    try {
      await db.User.destroy({
        truncate: true,
        cascade: true,
        logging: false
      });
    } catch (error) {
      throw error;
    }
  });

  it('should not create a user if some required fields are not provided', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth')
      .send(Factory.userFacebook.build({ name: { familyName: null, givenName: null } }))
      .end((err, res) => {
        expect(res.body).to.include.keys('errors');
        done();
      });
  });

  it('should register a facebook user', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth')
      .send(userFacebook)
      .end((err, res) => {
        expect(res.status).to.equal(status.CREATED);
        done();
      });
  });

  it('should login a facebook user', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth')
      .send(userFacebook)
      .end((err, res) => {
        expect(res.status).to.equal(status.OK);
        done();
      });
  });

  it('should register a twitter user', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth')
      .send(userTwitter)
      .end((err, res) => {
        expect(res.status).to.equal(status.CREATED);
        done();
      });
  });

  it('should login a twitter user', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth')
      .send(userTwitter)
      .end((err, res) => {
        expect(res.status).to.equal(status.OK);
        done();
      });
  });

  it('should register a google user', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth')
      .send(userGoogle)
      .end((err, res) => {
        expect(res.status).to.equal(status.CREATED);
        done();
      });
  });

  it('should login a google user', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth')
      .send(userGoogle)
      .end((err, res) => {
        expect(res.status).to.equal(status.OK);
        done();
      });
  });

  it('should not register a user if the email is already used', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth')
      .send({ ...userFacebook, provider: 'another' })
      .end((err, res) => {
        expect(res.status).to.equal(status.EXIST);
        done();
      });
  });

  it('should not register a user if username is already used', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth')
      .send({ ...userTwitter, provider: 'another' })
      .end((err, res) => {
        expect(res.status).to.equal(status.EXIST);
        done();
      });
  });

  it('should not create a user if the body is empty', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth')
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(status.BAD_REQUEST);
        done();
      });
  });

  it('should not create a user if some inputs are not correct', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth')
      .send(Factory.userFacebook.build({ provider: {} }))
      .end((err, res) => {
        expect(res.body).to.include.keys('errors');
        done();
      });
  });
});
