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

let accessToken = '';
let createdUser = '';
let savedChat = '';

const user = Factory.user.build();
const article = Factory.article.build();

delete user.id;
delete article.id;

describe('Chats', () => {
  before(async () => {
    try {
      await db.User.destroy({
        truncate: true,
        cascade: true,
        logging: false
      });
      createdUser = (await db.User.create(user, { logging: false })).dataValues;
      accessToken = jwt.sign(
        { id: createdUser.id, role: createdUser.role, permissions: createdUser.permissions },
        process.env.SECRET_KEY,
        { expiresIn: '1d' }
      );
    } catch (error) {
      throw error;
    }
  });

  // save a chat message
  it('should save a chat message', (done) => {
    chai
      .request(app)
      .post('/api/v1/chats')
      .set('access-token', accessToken)
      .send({ message: 'hello' })
      .end((err, res) => {
        savedChat = res.body.chat;
        expect(res.status).to.be.equal(status.OK);
        expect(res.body).to.not.include.keys('errors');
        done();
      });
  });

  it('should not save a chat message if it the body is empty or the message is not a string', (done) => {
    chai
      .request(app)
      .post('/api/v1/chats')
      .set('access-token', accessToken)
      .send({})
      .end((err, res) => {
        expect(res.status).to.be.equal(status.BAD_REQUEST);
        expect(res.body).to.include.keys('errors');
        done();
      });
  });

  it("should not save a chat message if the user doesn't exist", (done) => {
    const invalidUserAccessToken = jwt.sign(
      { id: 0, role: createdUser.role, permissions: createdUser.permissions },
      process.env.SECRET_KEY,
      { expiresIn: '1d' }
    );
    chai
      .request(app)
      .post('/api/v1/chats')
      .set('access-token', invalidUserAccessToken)
      .send({ message: 'hello' })
      .end((err, res) => {
        expect(res.status).to.be.equal(status.UNAUTHORIZED);
        expect(res.body).to.include.keys('errors');
        done();
      });
  });

  it('should throw an error', (done) => {
    const invalidUserAccessToken = jwt.sign(
      { id: {}, role: createdUser.role, permissions: createdUser.permissions },
      process.env.SECRET_KEY,
      { expiresIn: '1d' }
    );
    chai
      .request(app)
      .post('/api/v1/chats')
      .set('access-token', invalidUserAccessToken)
      .send({ message: 'hello' })
      .end((err, res) => {
        expect(res.status).to.be.equal(status.SERVER_ERROR);
        expect(res.body).to.include.keys('errors');
        done();
      });
  });

  // get chats
  it('should get all chats', (done) => {
    chai
      .request(app)
      .get('/api/v1/chats')
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.OK);
        expect(res.body).to.not.include.keys('errors');
        done();
      });
  });

  it('should get all chats', (done) => {
    chai
      .request(app)
      .get('/api/v1/chats?limit=1&offset=0')
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.OK);
        expect(res.body).to.not.include.keys('errors');
        done();
      });
  });

  // remove a chat
  it('should remove a chat', (done) => {
    chai
      .request(app)
      .delete(`/api/v1/chats/${savedChat.id}`)
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.OK);
        expect(res.body).to.not.include.keys('errors');
        done();
      });
  });

  it('should not remove a chat', (done) => {
    chai
      .request(app)
      .delete(`/api/v1/chats/${savedChat.id}`)
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.NOT_FOUND);
        expect(res.body).to.include.keys('errors');
        done();
      });
  });

  it('should throw an error if the parameter passed is not valid', (done) => {
    chai
      .request(app)
      .delete('/api/v1/chats/{}')
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.BAD_REQUEST);
        expect(res.body).to.include.keys('errors');
        done();
      });
  });
});
