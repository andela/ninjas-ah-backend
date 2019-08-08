/* eslint-disable no-unused-expressions */
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

  it('should not get user information', (done) => {
    chai
      .request(app)
      .get('/api/v1/auth/1')
      .set('access-token', 'aaa')
      .end((err, res) => {
        expect(res.status).to.be.equal(status.UNAUTHORIZED);
        done();
      });
  });

  it('should get user information', (done) => {
    chai
      .request(app)
      .get(`/api/v1/auth/${createdUserOne.id}`)
      .set('access-token', accessTokenAdmin)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.OK);
        done();
      });
  });

  // activate user account
  it('should activate user account', (done) => {
    const userTwoAccessToken = jwt.sign(
      {
        email: createdUserOne.email,
        expiresIn: '2h'
      },
      process.env.SECRET_KEY,
      { expiresIn: '1d' }
    );
    chai
      .request(app)
      .get(`/api/v1/auth/activate/${userTwoAccessToken}`)
      .set('access-token', userTwoAccessToken)
      .end((err, res) => {
        chai.expect(res).to.redirect;
        done();
      });
  });
  // activate account for user two
  it('should activate user account', (done) => {
    const userAccessToken = jwt.sign(
      {
        email: createdUserTwo.email,
        expiresIn: '2h'
      },
      process.env.SECRET_KEY,
      { expiresIn: '1d' }
    );
    chai
      .request(app)
      .get(`/api/v1/auth/activate/${userAccessToken}`)
      .set('access-token', userAccessToken)
      .end((err, res) => {
        chai.expect(res).to.redirect;
        done();
      });
  });
  // update user profile
  it('should update the user profile', (done) => {
    chai
      .request(app)
      .put('/api/v1/users')
      .send({ username: 'anotherusername', password: 'Abcd1234!', email: 'email@email.com' })
      .set('access-token', accessTokenNormalUser)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.OK);
        expect(res.body).to.include.keys('user');
        expect(res.body).to.not.include.keys('errors');
        done();
      });
  });
  it('should not update the user profile if the email is already used', (done) => {
    chai
      .request(app)
      .put('/api/v1/users')
      .send({ email: createdUserTwo.email })
      .set('access-token', accessTokenNormalUser)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.EXIST);
        expect(res.body).to.not.include.keys('user');
        expect(res.body).to.include.keys('errors');
        done();
      });
  });
  it('should update the user profile', (done) => {
    chai
      .request(app)
      .put(`/api/v1/users/${createdUserOne.id}`)
      .send({ password: 'Abcd1234!!', permissions: JSON.parse(createdUserOne.permissions) })
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
      .send({ role: 'admin', permissions: {} })
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
      .send({ email: createdUserOne.email })
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

  it('should not update user email if the token is not valid', (done) => {
    chai
      .request(app)
      .get('/api/v1/users/email/confirm/invalid-token')
      .set('access-token', accessTokenNormalUser)
      .end((err, res) => {
        expect(res).to.redirect;
        expect(res.redirects[0].indexOf(`token=${status.UNAUTHORIZED}`)).to.be.above(0);
        done();
      });
  });

  it('should update user email if the token is valid', (done) => {
    const token = jwt.sign(
      {
        userId: createdUserOne.id,
        email: 'new@email.com'
      },
      process.env.SECRET_KEY,
      { expiresIn: '1d' }
    );
    chai
      .request(app)
      .get(`/api/v1/users/email/confirm/${token}`)
      .set('access-token', accessTokenNormalUser)
      .end((err, res) => {
        expect(res).to.redirect;
        expect(res.redirects[0].indexOf('email=new@email.com')).to.be.above(0);
        done();
      });
  });

  it('should fetch one user by id', (done) => {
    chai
      .request(app)
      .get(`/api/v1/users/${createdUserTwo.id}`)
      .set('access-token', accessTokenAdmin)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.OK);
        done();
      });
  });
  it('should not fetch one user by if id is wrong', (done) => {
    const id = 0;
    chai
      .request(app)
      .get(`/api/v1/users/${id}`)
      .set('access-token', accessTokenAdmin)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.NOT_FOUND);
        done();
      });
  });

  it('return all users whose username include the provided characters', (done) => {
    chai
      .request(app)
      .get(`/api/v1/users/username/${createdUserTwo.username}?limit=1&offset=0`)
      .set('access-token', accessTokenAdmin)
      .end((err, res) => {
        res.body.should.be.an('object');
        expect(res.body).to.include.keys('users');
        expect(res.body.users.length).to.be.greaterThan(0);
        res.status.should.be.equal(status.OK);
        done();
      });
  });

  it('should not return all users if no user with the provided username is found ', (done) => {
    chai
      .request(app)
      .get('/api/v1/users/username/fake-username?limit=1&offset=0')
      .set('access-token', accessTokenAdmin)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(status.NOT_FOUND);
        done();
      });
  });
});
