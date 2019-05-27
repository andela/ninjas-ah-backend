/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import db from '../../../models';
import { Notification } from '../../../queries';
import * as Factory from '../../../helpers/factory';

const { expect } = chai;

let createdUser = '';

const user = Factory.user.build();
const notificationConfig = Factory.notificationConfig.build();

delete user.id;

describe('Get notification config query', () => {
  before(async () => {
    try {
      await db.User.destroy({
        truncate: true,
        cascade: true,
        logging: false
      });
      createdUser = (await db.User.create(user, { logging: false })).dataValues;
      notificationConfig.userId = createdUser.id;
      notificationConfig.config = JSON.stringify(notificationConfig.config);
      await db.NotificationConfig.create(notificationConfig, { logging: false });
    } catch (error) {
      throw error;
    }
  });

  it('should get one configuration', async () => {
    const savedConfig = await Notification.config.getOne(createdUser.id);
    expect(Object.keys(savedConfig).length).to.be.above(0);
  });

  it('should not get one configuration if the user ID is not found', async () => {
    const savedConfig = await Notification.config.getOne(0);
    expect(Object.keys(savedConfig).length).to.be.equal(0);
  });

  it('should not throw an error if no provided parameter', async () => {
    const savedConfig = await Notification.config.getOne();
    expect(savedConfig).to.include.keys('errors');
  });

  it('should not throw an error if the user ID is not valid', async () => {
    const savedConfig = await Notification.config.getOne(['~~~']);
    expect(savedConfig).to.include.keys('errors');
  });
});
