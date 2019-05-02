/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import express from 'express';
import * as Factory from '../../helpers/factory';
import db from '../../models';
import validateNewUser from '../../middlewares/validate-new-user';

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

describe('Check Existing user', () => {
  before(async () => {
    try {
      await db.User.create(newUser, { logging: false });
    } catch (error) {
      throw error;
    }
  });

  it('should return an error message if the body is empty', async () => {
    chai
      .request(app)
      .post('/api/users')
      .send({})
      .end((err, res) => {
        const { errors } = res.body;
        expect(res.status).to.equal(400);
        expect(errors.body.length).to.be.above(0);
      });
  });

  it('should return an error message if there is an existing user email', async () => {
    chai
      .request(app)
      .post('/api/users')
      .send(newUser)
      .end((err, res) => {
        const { errors } = res.body;
        expect(res.status).to.equal(400);
        expect(errors.email.length).to.be.above(0);
      });
  });

  it('should return an error message if the email is not valid', async () => {
    newUser.password = Factory.user.build().password;
    newUser.email = 'abcdz@gma/il.com';
    chai
      .request(app)
      .post('/api/users')
      .send(newUser)
      .end((err, res) => {
        const { errors } = res.body;
        expect(res.status).to.equal(400);
        expect(errors.email.length).to.be.above(0);
      });
  });

  it("should return an error message if the password doesn't meet the requirements", async () => {
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
      });
  });

  it('should not return any error', async () => {
    newUser.password = Factory.user.build().password;
    newUser.email = 'abcd@gmail.com';
    chai
      .request(app)
      .post('/api/users')
      .send(newUser)
      .end((err, res) => {
        expect(res.status).to.not.equal(400);
      });
  });

  after(async () => {
    try {
      newUser.email = Factory.user.build().email;
      await db.User.destroy({
        where: { email: newUser.email },
        logging: false
      });
    } catch (error) {
      throw error;
    }
  });
});
