/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import db from '../../../models';
import { Notification } from '../../../queries';
import * as Factory from '../../../helpers/factory';

const { expect } = chai;

let createdUser = '';

const user = Factory.user.build();
const notification = Factory.notification.build();

delete user.id;

describe('Create notification query', () => {
  before(async () => {
    try {
      await db.User.destroy({
        truncate: true,
        cascade: true,
        logging: false
      });
      createdUser = (await db.User.create(user, { logging: false })).dataValues;
    } catch (error) {
      throw error;
    }
  });

  it('should notify a user when an article is published', async () => {
    const createdNotification = await Notification.create(createdUser.id, notification.message);
    expect(Object.keys(createdNotification).length).to.be.above(0);
    expect(createdNotification).to.not.include.keys('errors');
  });

  it('should not notify a user ID is not found', async () => {
    const createdNotification = await Notification.create(0, notification.message);
    expect(createdNotification).to.include.keys('errors');
  });

  it('should not notify a user if the message is not provided', async () => {
    const createdNotification = await Notification.create(createdUser.id);
    expect(createdNotification).to.include.keys('errors');
  });

  it('should not notify a user if no parameter is not provided', async () => {
    const createdNotification = await Notification.create();
    expect(createdNotification).to.include.keys('errors');
  });
});
