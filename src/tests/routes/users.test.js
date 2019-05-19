/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../../models';
import status from '../../config/status';
import * as Factory from '../../helpers/factory';
import app from '../../app';

dotenv.config();

const { expect } = chai;

let accessTokenAdmin = '';
let accessTokenNormalUser = '';
let createdUserOne = '';
let createdUserTwo = '';

const userOne = Factory.user.build();
const userTwo = Factory.user.build();

delete userOne.id;
delete userTwo.id;

userTwo.email = 'aaa@bbb.ccc';
userTwo.username = 'aaabbb';

describe('Users routes', () => {
  before(async () => {
    try {
      await db.User.destroy({
        truncate: true,
        cascade: true,
        logging: false
      });
      createdUserOne = (await db.User.create(userOne, { logging: false })).dataValues;
      createdUserTwo = (await db.User.create(userTwo, { logging: false })).dataValues;
      accessTokenAdmin = jwt.sign(
        {
          id: createdUserOne.id,
          role: createdUserOne.role,
          permissions: createdUserOne.permissions
        },
        process.env.SECRET_KEY,
        { expiresIn: '1d' }
      );
      accessTokenNormalUser = jwt.sign(
        {
          id: createdUserOne.id,
          role: 'normal',
          permissions: createdUserOne.permissions
        },
        process.env.SECRET_KEY,
        { expiresIn: '1d' }
      );
    } catch (error) {
      throw error;
    }
  });

  // update user profile
  it('should update the user profile', (done) => {
    chai
      .request(app)
      .put('/api/v1/users')
      .send({ username: 'anotherusername', password: 'Abcd1234!', email: 'aaa@bbb.com' })
      .set('access-token', accessTokenAdmin)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.OK);
        expect(res.body).to.include.keys('user');
        expect(res.body).to.not.include.keys('errors');
        done();
      });
  });
  it('should update the user profile', (done) => {
    chai
      .request(app)
      .put(`/api/v1/users/${createdUserOne.id}`)
      .send({ password: 'Abcd1234!!' })
      .set('access-token', accessTokenAdmin)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.OK);
        expect(res.body).to.include.keys('user');
        expect(res.body).to.not.include.keys('errors');
        done();
      });
  });

  it('should not update the user profile if the user is not authenticated', (done) => {
    chai
      .request(app)
      .put('/api/v1/users')
      .send({ username: 'anotherusername', password: 'Abcd1234!', email: 'aaa@bbb.com' })
      .end((err, res) => {
        expect(res.status).to.be.equal(status.UNAUTHORIZED);
        done();
      });
  });

  it('should not update the user profile if the user is not an admin', (done) => {
    chai
      .request(app)
      .put(`/api/v1/users/${createdUserTwo.id}`)
      .send({ email: 'aaa@bbb.com' })
      .set('access-token', accessTokenNormalUser)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.UNAUTHORIZED);
        done();
      });
  });

  it('should not update the user profile if there is a user with the same email', (done) => {
    chai
      .request(app)
      .put(`/api/v1/users/${createdUserTwo.id}`)
      .send({ email: 'aaa@bbb.com' })
      .set('access-token', accessTokenAdmin)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.EXIST);
        done();
      });
  });

  it('should not update the user profile if there is a user with the same username', (done) => {
    chai
      .request(app)
      .put(`/api/v1/users/${createdUserTwo.id}`)
      .send({ username: 'anotherusername' })
      .set('access-token', accessTokenAdmin)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.EXIST);
        done();
      });
  });

  it('should not update the user profile if some inputs are malformed', (done) => {
    chai
      .request(app)
      .put('/api/v1/users')
      .send({ username: '' })
      .set('access-token', accessTokenAdmin)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.BAD_REQUEST);
        done();
      });
  });

  it('should not update the user profile if some inputs are malformed', (done) => {
    chai
      .request(app)
      .put('/api/v1/users')
      .send({ password: 'abcd1234!', email: 'aaa@bbb' })
      .set('access-token', accessTokenAdmin)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.BAD_REQUEST);
        done();
      });
  });

  it('should not update the user profile if the body is empty', (done) => {
    chai
      .request(app)
      .put('/api/v1/users')
      .send({})
      .set('access-token', accessTokenAdmin)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.BAD_REQUEST);
        done();
      });
  });
});
