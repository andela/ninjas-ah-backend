/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import express from 'express';
import status from '../../config/status';
import * as Factory from '../../helpers/factory';
import validateUser from '../../middlewares/validateUser';

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

app.use('/api/v1/users', router.post('/', validateUser));
app.use('/api/v1/users', router.put('/', validateUser));

const newUser = Factory.user.build();
delete newUser.id;
delete newUser.role;

describe('Validate user inputs on registration', () => {
  it('should return an error message if the body is empty', (done) => {
    chai
      .request(app)
      .post('/api/v1/users')
      .send({})
      .end((err, res) => {
        const { errors } = res.body;
        expect(res.status).to.equal(400);
        expect(Object.keys(errors).length).to.be.above(0);
        done();
      });
  });

  it('should return an error message if the email is not valid', (done) => {
    newUser.email = 'abcdz@gma/il.com';
    chai
      .request(app)
      .post('/api/v1/users')
      .send(newUser)
      .end((err, res) => {
        const { errors } = res.body;
        expect(res.status).to.equal(400);
        expect(errors.email.length).to.be.above(0);
        done();
      });
  });

  it("should return an error message if the password doesn't meet the requirements", (done) => {
    newUser.password = 'baaa1234';
    newUser.email = Factory.user.build().email;
    chai
      .request(app)
      .post('/api/v1/users')
      .send(newUser)
      .end((err, res) => {
        const { errors } = res.body;
        expect(res.status).to.equal(400);
        expect(errors.password.length).to.be.above(0);
        done();
      });
  });

  it('should not return any error', (done) => {
    newUser.email = 'aaabbbccc@gmail.com';
    newUser.password = 'Baaa1234!';
    chai
      .request(app)
      .post('/api/v1/users')
      .send(newUser)
      .end((err, res) => {
        expect(res.status).to.not.equal(400);
        done();
      });
  });

  it('should not return any error', (done) => {
    newUser.email = '';
    newUser.password = 'Baaa1234!';
    chai
      .request(app)
      .post('/api/v1/users')
      .send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });
});

describe('Validate user inputs when users want to update their profile', () => {
  it('should not update the email if it is not valid', (done) => {
    chai
      .request(app)
      .put('/api/v1/users')
      .send({ email: 'aaa@bbb' })
      .end((err, res) => {
        const { errors } = res.body;
        expect(res.status).to.equal(status.BAD_REQUEST);
        expect(errors.email.length).to.be.above(0);
        done();
      });
  });

  it("should not update the password if it doesn't meet the requirements", (done) => {
    chai
      .request(app)
      .put('/api/v1/users')
      .send({ password: 'baaa1234' })
      .end((err, res) => {
        const { errors } = res.body;
        expect(res.status).to.equal(status.BAD_REQUEST);
        expect(errors.password.length).to.be.above(0);
        done();
      });
  });

  it('should not update user profile if some inputs are empty', (done) => {
    chai
      .request(app)
      .put('/api/v1/users')
      .send({ username: '' })
      .end((err, res) => {
        expect(res.status).to.equal(status.BAD_REQUEST);
        done();
      });
  });
});
