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

describe('Create notification config query', () => {
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

  it('should save a user configuration', async () => {
    const createdNotificationConfig = await Notification.config.create(
      createdUser.id,
      notificationConfig.config
    );
    expect(Object.keys(createdNotificationConfig).length).to.be.above(0);
    expect(createdNotificationConfig).to.not.include.keys('errors');
  });

  it('should not save a user configuration if it already exists', async () => {
    const createdNotificationConfig = await Notification.config.create(
      createdUser.id,
      notificationConfig.config
    );
    expect(createdNotificationConfig).to.include.keys('errors');
  });

  it('should not save a user configuration if the configurations is not passed', async () => {
    const createdNotificationConfig = await Notification.config.create(createdUser.id);
    expect(createdNotificationConfig).to.include.keys('errors');
  });

  it('should not save a user configuration if no parameter is provided', async () => {
    const createdNotificationConfig = await Notification.config.create();
    expect(createdNotificationConfig).to.include.keys('errors');
  });
});
