/* eslint-disable import/no-extraneous-dependencies */
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
import checkPermission from '../../middlewares/checkPermissions';

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
app.use(
  '/api/v1',
  router.put('/users', verifyToken, checkPermission({ route: 'users', action: 'create' }))
);

app.use(
  '/api/v1',
  router.put('/articles', verifyToken, checkPermission({ route: 'articles', action: 'edit' }))
);

const newUser = Factory.user.build();
delete newUser.id;

describe('Verify permission', () => {
  before(async () => {
    try {
      await db.User.destroy({
        truncate: true,
        cascade: true,
        logging: false
      });
      createdUser = (await db.User.create(user, { logging: false })).dataValues;
      token = jwt.sign(
        { id: createdUser.id, role: createdUser.role, permissions: user.permissions },
        process.env.SECRET_KEY,
        {
          expiresIn: '1d'
        }
      );
    } catch (error) {
      throw error;
    }
  });

  it('should not restrict the access', (done) => {
    chai
      .request(app)
      .put('/api/v1/users')
      .set('access-token', token)
      .end((err, res) => {
        expect(res.body).to.not.include.keys('errors');
        done();
      });
  });

  it('should return a bad request', (done) => {
    const invalidUserAccessToken = jwt.sign(
      { id: createdUser.id, role: createdUser.role, permissions: '{}' },
      process.env.SECRET_KEY,
      { expiresIn: '1d' }
    );
    chai
      .request(app)
      .put('/api/v1/users')
      .set('access-token', invalidUserAccessToken)
      .end((err, res) => {
        expect(res.status).to.equal(status.BAD_REQUEST);
        done();
      });
  });

  it('should return unauthorized on permission', (done) => {
    chai
      .request(app)
      .put('/api/v1/articles')
      .set('access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(status.UNAUTHORIZED);
        done();
      });
  });
});
