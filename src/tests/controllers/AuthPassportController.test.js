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

describe('Authentication controller', () => {
  beforeEach(async () => {
    try {
      await db.User.destroy({
        where: {
          [db.Op.or]: [
            { accountProvider: 'facebook' },
            { accountProvider: 'twitter' },
            { accountProvider: 'google' }
          ]
        },
        logging: false
      });
    } catch (error) {
      throw error;
    }
  });

  it('should login or register a user', (done) => {
    const agent = chai.request.agent(app);
    agent
      .post('/api/v1/auth')
      .send(userFacebook)
      .then((res) => {
        expect(res.status).to.equal(status.CREATED);
        return agent
          .post('/api/v1/auth')
          .send(userFacebook)
          .then((res) => {
            expect(res.status).to.equal(status.OK);
          })
          .then(() => {
            done();
            agent.close();
          });
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

  it('should not create a user if some required fields are not provided', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth')
      .send(Factory.userFacebook.build({ name: { familyName: null, givenName: null } }))
      .end((err, res) => {
        expect(res.body).to.include.keys('error');
        done();
      });
  });

  it('should not create a user if some inputs are not correct', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth')
      .send(Factory.userFacebook.build({ provider: {} }))
      .end((err, res) => {
        expect(res.body).to.include.keys('error');
        done();
      });
  });
});
