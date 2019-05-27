/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import sinonChai from 'sinon-chai';

import {
  sequelize, dataTypes, checkModelName, checkPropertyExists
} from 'sequelize-test-helpers';

import NotificationModel from '../../models/notification';

const { expect } = chai;
chai.use(sinonChai);

// test notification model
describe('src/models/Notification', () => {
  const Notification = NotificationModel(sequelize, dataTypes);
  const notification = new Notification();

  checkModelName(Notification)('Notification');

  context('properties', () => {
    ['userId', 'message', 'status', 'createdAt', 'updatedAt'].forEach(
      checkPropertyExists(notification)
    );
  });

  context('check associations', () => {
    const User = 'user';
    before(() => {
      Notification.associate({ User });
    });

    it('defined a belongsTo association with User', () => {
      expect(Notification.belongsTo).to.have.been.calledWith(User);
    });
  });
});
