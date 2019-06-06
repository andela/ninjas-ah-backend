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

describe('Get notification query', () => {
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
        {
          logging: false
        }
      )).dataValues;
    } catch (error) {
      throw error;
    }
  });

  it('should get one notification', async () => {
    const notification = await Notification.getOne(createdUser.id, createdNotification.id);
    expect(Object.keys(notification).length).to.be.above(0);
    expect(notification).to.not.include.keys('errors');
  });

  it('should not get one notification if the notification ID is not provided', async () => {
    const notification = await Notification.getOne(createdUser.id);
    expect(notification).to.include.keys('errors');
  });

  it('should not get one notification if the user ID is not found', async () => {
    const notification = await Notification.getOne(0, createdNotification.id);
    expect(Object.keys(notification).length).to.be.equal(0);
    expect(notification).to.not.include.keys('errors');
  });

  it('should not get one notification if no provided parameter', async () => {
    const notification = await Notification.getOne();
    expect(notification).to.include.keys('errors');
  });

  it('should throw an error if the user ID or notification ID is not valid', async () => {
    const notification = await Notification.getOne(['~~~'], ['~~~']);
    expect(notification).to.include.keys('errors');
  });
});
