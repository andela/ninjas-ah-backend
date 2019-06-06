/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import db from '../../../models';
import { Notification } from '../../../queries';
import * as Factory from '../../../helpers/factory';

const { expect } = chai;

let createdUser = '';

const user = Factory.user.build();

delete user.id;

describe('Get notifications query', () => {
  before(async () => {
    try {
      await db.User.destroy({
        truncate: true,
        cascade: true,
        logging: false
      });
      createdUser = (await db.User.create(user, { logging: false })).dataValues;
      await db.Notification.create(Factory.notification.build({ userId: createdUser.id }), {
        logging: false
      });
    } catch (error) {
      throw error;
    }
  });

  it('should get all notifications', async () => {
    const notifications = await Notification.getAll(createdUser.id, 'unseen');
    expect(notifications.length).to.be.above(0);
    expect(notifications).to.not.include.keys('errors');
  });

  it('should get all notifications', async () => {
    const notifications = await Notification.getAll(createdUser.id);
    expect(notifications.length).to.be.above(0);
    expect(notifications).to.not.include.keys('errors');
  });

  it('should not get all notifications if the user ID is not found', async () => {
    const notifications = await Notification.getAll(0, 'unseen');
    expect(notifications.length).to.be.equal(0);
    expect(notifications).to.not.include.keys('errors');
  });

  it('should not get all notifications if no provided parameter', async () => {
    const notifications = await Notification.getAll();
    expect(notifications).to.include.keys('errors');
  });

  it('should throw an error if the user ID is not valid', async () => {
    const notifications = await Notification.getAll(['~~~']);
    expect(notifications).to.include.keys('errors');
  });
});
