/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import sinonChai from 'sinon-chai';

import {
  sequelize, dataTypes, checkModelName, checkPropertyExists
} from 'sequelize-test-helpers';

import NotificationConfigConfigModel from '../../models/notificationconfig';

const { expect } = chai;
chai.use(sinonChai);

// test notificationconfig model
describe('src/models/NotificationConfig', () => {
  const NotificationConfig = NotificationConfigConfigModel(sequelize, dataTypes);
  const notificationconfig = new NotificationConfig();

  checkModelName(NotificationConfig)('NotificationConfig');

  context('properties', () => {
    ['userId', 'config', 'createdAt', 'updatedAt'].forEach(checkPropertyExists(notificationconfig));
  });

  context('check associations', () => {
    const User = 'user';
    before(() => {
      NotificationConfig.associate({ User });
    });

    it('defined a belongsTo association with User', () => {
      expect(NotificationConfig.belongsTo).to.have.been.calledWith(User);
    });
  });
});
