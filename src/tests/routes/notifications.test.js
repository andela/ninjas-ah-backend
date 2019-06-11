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
let fakeToken = '';
let createdUser = '';
let createdNotification = '';

const user = Factory.user.build();
const notificationConfig = Factory.notificationConfig.build();

delete user.id;

describe('Notifications', () => {
  before(async () => {
    await db.User.destroy({
      truncate: true,
      cascade: true,
      logging: false
    });
    createdUser = (await db.User.create(user, { logging: false })).dataValues;
    createdNotification = (await db.Notification.create(
      Factory.notification.build({ userId: createdUser.id }),
      { logging: false }
    )).dataValues;
    accessToken = jwt.sign(
      { id: createdUser.id, role: createdUser.role, permissions: createdUser.permissions },
      process.env.SECRET_KEY,
      { expiresIn: '1d' }
    );

    fakeToken = jwt.sign(
      { id: {}, role: createdUser.role, permissions: createdUser.permissions },
      process.env.SECRET_KEY,
      { expiresIn: '1d' }
    );
  });

  // set notification config
  it('should set notification config', (done) => {
    chai
      .request(app)
      .post('/api/v1/notifications/configuration')
      .set('access-token', accessToken)
      .send(notificationConfig)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.CREATED);
        expect(res.body).to.not.include.keys('errors');
        done();
      });
  });

  it('should not set notification config if the user has already set configurations', (done) => {
    chai
      .request(app)
      .post('/api/v1/notifications/configuration')
      .set('access-token', accessToken)
      .send(notificationConfig)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.EXIST);
        expect(res.body).to.include.keys('errors');
        done();
      });
  });

  it('should not set notification config if the configurations are malformed', (done) => {
    chai
      .request(app)
      .post('/api/v1/notifications/configuration')
      .set('access-token', accessToken)
      .send({})
      .end((err, res) => {
        expect(res.status).to.be.equal(status.BAD_REQUEST);
        expect(res.body).to.include.keys('errors');
        done();
      });
  });

  // get notification config
  it('should get notification config', (done) => {
    chai
      .request(app)
      .get('/api/v1/notifications/configuration')
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.OK);
        expect(res.body).to.not.include.keys('errors');
        done();
      });
  });

  it('should not get notification config', (done) => {
    chai
      .request(app)
      .get('/api/v1/notifications/configuration')
      .set('access-token', fakeToken)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.SERVER_ERROR);
        expect(res.body).to.include.keys('errors');
        done();
      });
  });

  // update notification config
  it('should update notification config', (done) => {
    chai
      .request(app)
      .put('/api/v1/notifications/configuration')
      .set('access-token', accessToken)
      .send(notificationConfig)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.OK);
        expect(res.body).to.not.include.keys('errors');
        done();
      });
  });

  it('should not update notification config if the configurations are malformed', (done) => {
    chai
      .request(app)
      .put('/api/v1/notifications/configuration')
      .set('access-token', accessToken)
      .send({})
      .end((err, res) => {
        expect(res.status).to.be.equal(status.BAD_REQUEST);
        expect(res.body).to.include.keys('errors');
        done();
      });
  });

  it('should not update notification config', (done) => {
    chai
      .request(app)
      .put('/api/v1/notifications/configuration')
      .set('access-token', fakeToken)
      .send(notificationConfig)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.SERVER_ERROR);
        expect(res.body).to.include.keys('errors');
        done();
      });
  });

  // get notifications
  it('should get all notifications', (done) => {
    chai
      .request(app)
      .get('/api/v1/notifications')
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.OK);
        expect(res.body).to.not.include.keys('errors');
        done();
      });
  });

  it('should get all unseen notifications', (done) => {
    chai
      .request(app)
      .get('/api/v1/notifications/unseen')
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.OK);
        expect(res.body).to.not.include.keys('errors');
        done();
      });
  });

  it('should get all seen notifications', (done) => {
    chai
      .request(app)
      .get('/api/v1/notifications/seen')
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.OK);
        expect(res.body).to.not.include.keys('errors');
        done();
      });
  });

  it('should not get notifications if the user ID is invalid', (done) => {
    chai
      .request(app)
      .get('/api/v1/notifications')
      .set('access-token', fakeToken)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.SERVER_ERROR);
        expect(res.body).to.include.keys('errors');
        done();
      });
  });

  it('should get one notification by ID', (done) => {
    chai
      .request(app)
      .get(`/api/v1/notifications/${createdNotification.id}`)
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.OK);
        expect(res.body).to.not.include.keys('errors');
        done();
      });
  });

  it('should not get one a notification if the provided ID is not valid', (done) => {
    chai
      .request(app)
      .get('/api/v1/notifications/{}')
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.BAD_REQUEST);
        expect(res.body).to.include.keys('errors');
        done();
      });
  });

  // update notifications
  it('should update the status notifications to "seen"', (done) => {
    chai
      .request(app)
      .put('/api/v1/notifications/seen')
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.OK);
        expect(res.body).to.not.include.keys('errors');
        done();
      });
  });

  it('should update the status notifications to "unseen"', (done) => {
    chai
      .request(app)
      .put('/api/v1/notifications/unseen')
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.OK);
        expect(res.body).to.not.include.keys('errors');
        done();
      });
  });

  it('should update the status of a notification to "seen"', (done) => {
    chai
      .request(app)
      .put(`/api/v1/notifications/${createdNotification.id}/seen`)
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.OK);
        expect(res.body).to.not.include.keys('errors');
        done();
      });
  });

  it('should update the status of a notification to "unseen"', (done) => {
    chai
      .request(app)
      .put(`/api/v1/notifications/${createdNotification.id}/unseen`)
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.OK);
        expect(res.body).to.not.include.keys('errors');
        done();
      });
  });

  it('should not update the status of a notification if the ID is not valid', (done) => {
    chai
      .request(app)
      .put('/api/v1/notifications/{}/seen')
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.BAD_REQUEST);
        expect(res.body).to.include.keys('errors');
        done();
      });
  });

  it('should not update the status of a notification if the ID is not valid', (done) => {
    chai
      .request(app)
      .put('/api/v1/notifications/{}/unseen')
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.BAD_REQUEST);
        expect(res.body).to.include.keys('errors');
        done();
      });
  });

  // remove a notification
  it('should remove a notification', (done) => {
    chai
      .request(app)
      .delete(`/api/v1/notifications/${createdNotification.id}`)
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.OK);
        expect(res.body).to.not.include.keys('errors');
        done();
      });
  });

  it('should not remove a notification', (done) => {
    chai
      .request(app)
      .delete(`/api/v1/notifications/${createdNotification.id}`)
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
      .delete('/api/v1/notifications/{}')
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.BAD_REQUEST);
        expect(res.body).to.include.keys('errors');
        done();
      });
  });
});
