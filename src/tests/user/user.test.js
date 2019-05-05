import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../../models/index';
import app from '../../app';

dotenv.config();

chai.use(chaiHttp);
chai.should();

const userEmail = {
  email: 'luctunechi45@gmail.com',
};

const notMatch = {
  passwordOne: 'newpasswordi',
  passwordTwo: 'newpassworda'
};

const newPassword = {
  passwordOne: 'newpassworda',
  passwordTwo: 'newpassworda'
};

const newUser = {
  firstName: 'John',
  lastName: 'Smith',
  username: 'josmi',
  email: 'luctunechi45@gmail.com',
  password: 'Baaa1234!',
};

const token = jwt.sign({ email: userEmail.email }, process.env.SECRET, { expiresIn: '1d' });

describe('Forgot Password', () => {
  before(async () => {
    try {
      await db.User.create(newUser);
    } catch (error) {
      throw error;
    }
  });

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

  it('it should update password with valid token', async () => {
    chai
      .request(app)
      .patch(`/api/v1/auth/reset/${token}`)
      .send(newPassword)
      .end((err, res) => {
        chai.expect(res.status).to.eql(200);
        chai.expect(res.body).to.be.an('object');
      });
  });

  it('it should not update password when password does not match', async () => {
    chai
      .request(app)
      .patch(`/api/v1/auth/reset/${token}`)
      .send(notMatch)
      .end((err, res) => {
        chai.expect(res.status).to.eql(400);
        chai.expect(res.body).to.be.an('object');
      });
  });
});
