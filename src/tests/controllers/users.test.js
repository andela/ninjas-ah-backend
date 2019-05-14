/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import status from '../../config/status';
import db from '../../models';
import * as Factory from '../../helpers/factory';

chai.should();
chai.use(chaiHttp);
const user = Factory.user.build();
delete user.id;

// user test
describe('user tests', () => {
  describe('user signup', () => {
    // test signup;
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
    it('Should register new user', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.status.should.equal(status.CREATED);
          res.body.should.be.an('object');
          res.body.should.have.property('token');
          done();
        });
    });
    it('chatch error', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send('...')
        .end((err, res) => {
          res.status.should.be.equal(status.SERVER_ERROR);
          done();
        });
    });
    it('Should fail to register new user if exists', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.body.should.be.an('object');
          res.status.should.be.equal(status.EXIST);
          res.body.should.have.property('error').equal('Sorry, this account already exists');
          done();
        });
    });
  });
  // test sign in
  describe('user sign in', () => {
    const userSignIn = {
      email: user.email,
      password: user.password
    };
    // test user sign in
    it('sign in user', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(userSignIn)
        .end((err, res) => {
          res.body.should.be.an('object');
          res.status.should.be.equal(status.OK);
          res.body.should.have.property('token');
          done();
        });
    });
    // test invalid user sign in
    it('invalid user sign in', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'sengayirepr@gmail.com',
          password: user.pasword
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.status.should.be.equal(status.UNAUTHORIZED);
          done();
        });
    });
    it('chatch error', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({
          email: true,
          password: 'password'
        })
        .end((err, res) => {
          res.status.should.be.equal(status.SERVER_ERROR);
          done();
        });
    });
    it(' should fail if password not match', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({
          email: user.email,
          password: '12313223123'
        })
        .end((err, res) => {
          res.status.should.be.equal(status.UNAUTHORIZED);
          done();
        });
    });
  });
});
