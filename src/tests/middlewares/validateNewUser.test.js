/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import express from 'express';
import * as Factory from '../../helpers/factory';
import validateNewUser from '../../middlewares/validateNewUser';

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

app.use('/api/users', router.post('/', validateNewUser));

const newUser = Factory.user.build();
delete newUser.id;

describe('validate user inputs when on registration', () => {
  it('should return an error message if the body is empty', (done) => {
    chai
      .request(app)
      .post('/api/users')
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
      .post('/api/users')
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
      .post('/api/users')
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
      .post('/api/users')
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
      .post('/api/users')
      .send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });
});
