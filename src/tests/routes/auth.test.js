/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as Factory from '../../helpers/factory';
import db from '../../models';
import app from '../../app';

dotenv.config();

chai.use(chaiHttp);
chai.should();

const newUser = Factory.user.build();
delete newUser.id;

const token = jwt.sign({ email: 'luctunechi45@gmail.com' }, process.env.SECRET_KEY, {
  expiresIn: '1d'
});

describe('Authentication', () => {
  before(async () => {
    try {
      await db.User.destroy({
        truncate: true,
        cascade: true,
        logging: false
      });
      await db.User.create(newUser, { logging: false });
    } catch (error) {
      throw error;
    }
  });

  describe('Reset Password', () => {
    it('should send the user a password reset link via email', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/reset/')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          done();
        });
    });

    it('it should not send an email when email not found', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/reset/')
        .send({ email: 'luctunechissas45@gmail.com' })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          done();
        });
    });

    it('it should update password with valid token', (done) => {
      chai
        .request(app)
        .patch(`/api/v1/auth/reset/${token}`)
        .send({
          passwordOne: 'Brazzaville10!',
          passwordTwo: 'Brazzaville10!'
        })
        .end((err, res) => {
          chai.expect(res.body).to.be.an('object');
          done();
        });
    });

    it('it should not update password when password does not match', (done) => {
      chai
        .request(app)
        .patch(`/api/v1/auth/reset/${token}`)
        .send({
          passwordOne: 'Brazzaville10!',
          passwordTwo: 'Brazzaville10!!'
        })
        .end((err, res) => {
          chai.expect(res.status).to.eql(400);
          chai.expect(res.body).to.be.an('object');
          done();
        });
    });

    it('it should not update password when password are empty', (done) => {
      chai
        .request(app)
        .patch(`/api/v1/auth/reset/${token}`)
        .send({
          passwordOne: '',
          passwordTwo: ''
        })
        .end((err, res) => {
          chai.expect(res.status).to.eql(400);
          chai.expect(res.body).to.be.an('object');
          done();
        });
    });

    it('it should not update password when password are not valid', (done) => {
      chai
        .request(app)
        .patch(`/api/v1/auth/reset/${token}`)
        .send({
          passwordOne: 'Brazzaville10',
          passwordTwo: 'Brazzaville10'
        })
        .end((err, res) => {
          chai.expect(res.status).to.eql(400);
          chai.expect(res.body).to.be.an('object');
          done();
        });
    });
  });
});
