/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import db from '../../../models';
import { Notification } from '../../../queries';
import * as Factory from '../../../helpers/factory';

const { expect } = chai;

let createdUser = '';
let createdNotificationOne = '';
let createdNotificationTwo = '';
const user = Factory.user.build();
const message = 'Hello';

delete user.id;

describe('Remove notification query', () => {
  before(async () => {
    try {
      await db.User.destroy({
        truncate: true,
        cascade: true,
        logging: false
      });
      createdUser = (await db.User.create(user, { logging: false })).dataValues;
      createdNotificationOne = (await db.Notification.create(
        { userId: createdUser.id, message },
        { logging: false }
      )).dataValues;
      createdNotificationTwo = (await db.Notification.create(
        { userId: createdUser.id, message },
        { logging: false }
      )).dataValues;
    } catch (error) {
      throw error;
    }
  });

  it('should remove a notification', async () => {
    const removedNotification = await Notification.remove(createdNotificationOne.id);
    expect(removedNotification).to.be.above(0);
    expect(removedNotification).to.not.include.keys('errors');
  });

  it('should not remove a notification if the notification ID is not found', async () => {
    const removedNotification = await Notification.remove(0);
    expect(removedNotification).to.be.equal(0);
  });

  it('should not remove a notification if the user ID is not found', async () => {
    const removedNotification = await Notification.remove(
      createdNotificationTwo.id,
      createdUser.id * 2
    );
    expect(removedNotification).to.be.equal(0);
  });

  it('should remove a notification', async () => {
    const removedNotification = await Notification.remove(
      createdNotificationTwo.id,
      createdUser.id
    );
    expect(removedNotification).to.be.above(0);
    expect(removedNotification).to.not.include.keys('errors');
  });

  it('should not remove a notification if the parameter passed is invalid', async () => {
    const removedNotification = await Notification.remove({});
    expect(removedNotification).to.include.keys('errors');
  });

  it('should not remove a notification if there is no passed parameter', async () => {
    const removedNotification = await Notification.remove();
    expect(removedNotification).to.be.equal(0);
  });
});
