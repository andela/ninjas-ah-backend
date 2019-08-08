/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import db from '../../../models';
import { Notification } from '../../../queries';
import * as Factory from '../../../helpers/factory';

const { expect } = chai;

let createdUser = '';
let createdNotification = '';

const user = Factory.user.build();

delete user.id;

describe('Update notification query', () => {
  before(async () => {
    try {
      await db.User.destroy({
        truncate: true,
        cascade: true,
        logging: false
      });
      createdUser = (await db.User.create(user, { logging: false })).dataValues;
      createdNotification = (await db.Notification.create(
        Factory.notification.build({ userId: createdUser.id }),
        { logging: false }
      )).get();
    } catch (error) {
      throw error;
    }
  });

  it('should update one notification', async () => {
    const notifications = await Notification.update(createdUser.id, createdNotification.id, {
      status: 'seen'
    });
    expect(notifications.length).to.be.above(0);
    expect(notifications).to.not.include.keys('errors');
  });

  it('should not update one notification if the notification ID is not found', async () => {
    const notifications = await Notification.update(createdUser.id, createdNotification.id * 2, {
      status: 'seen'
    });
    expect(notifications.length).to.be.equal(0);
    expect(notifications).to.not.include.keys('errors');
  });

  it('should not update one notification if the user ID is not found', async () => {
    const notifications = await Notification.update(0, createdNotification.id, { status: 'seen' });
    expect(notifications.length).to.be.equal(0);
    expect(notifications).to.not.include.keys('errors');
  });

  it('should update notifications of a given user', async () => {
    const notifications = await Notification.update(createdUser.id, null, { status: 'seen' });
    expect(notifications.length).to.be.above(0);
    expect(notifications).to.not.include.keys('errors');
  });

  it('should update notifications of a given user if the status is not valid', async () => {
    const notifications = await Notification.update(createdUser.id, null, { status: 'seennn' });
    expect(notifications).to.include.keys('errors');
  });

  it('should not update notifications of a given user if the user ID is not found', async () => {
    const notifications = await Notification.update(0, null, { status: 'seen' });
    expect(notifications.length).to.be.equal(0);
    expect(notifications).to.not.include.keys('errors');
  });

  it('should not update one notification if no provided parameter', async () => {
    const notifications = await Notification.update();
    expect(notifications).to.include.keys('errors');
  });

  it('should throw an error if the user ID or notification ID is not valid', async () => {
    const notifications = await Notification.update(['~~~'], ['~~~']);
    expect(notifications).to.include.keys('errors');
  });
});
