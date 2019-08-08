/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import db from '../../../models';
import { Notification } from '../../../queries';
import * as Factory from '../../../helpers/factory';

const { expect } = chai;

let createdUser = '';
let createdConfig = '';
const user = Factory.user.build();
const notificationConfig = Factory.notificationConfig.build();

delete user.id;

describe('Update notification config query', () => {
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
      createdConfig = (await db.NotificationConfig.create(notificationConfig, { logging: false }))
        .dataValues;
    } catch (error) {
      throw error;
    }
  });

  it('should update the configuration', async () => {
    notificationConfig.config = JSON.parse(notificationConfig.config);
    notificationConfig.config.email.articles.send = false;
    const updatedConfig = await Notification.config.update(createdUser.id, notificationConfig);
    expect(Object.keys(updatedConfig).length).to.be.above(0);
    expect(updatedConfig).to.not.include.keys('errors');
  });

  it('should not update the configuration if the user ID is not found', async () => {
    const updatedConfig = await Notification.config.update(0, notificationConfig);
    expect(Object.keys(updatedConfig).length).to.be.equal(0);
  });

  it('should not update the configuration if no provided parameter', async () => {
    const updatedConfig = await Notification.config.update();
    expect(Object.keys(updatedConfig).length).to.be.equal(0);
  });

  it('should not throw an error if the user ID is not valid', async () => {
    const updatedConfig = await Notification.config.update(notificationConfig, ['~~~']);
    expect(updatedConfig).to.include.keys('errors');
  });
});
