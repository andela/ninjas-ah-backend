/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import sinonChai from 'sinon-chai';

import {
  sequelize, dataTypes, checkModelName, checkPropertyExists
} from 'sequelize-test-helpers';

import ChatGroupModel from '../../models/chatgroup';

const { expect } = chai;
chai.use(sinonChai);

// test chatgroup model
describe('src/models/ChatGroup', () => {
  const ChatGroup = ChatGroupModel(sequelize, dataTypes);
  const chatgroup = new ChatGroup();

  checkModelName(ChatGroup)('ChatGroup');

  context('properties', () => {
    ['id', 'name', 'createdAt', 'updatedAt'].forEach(checkPropertyExists(chatgroup));
  });

  context('check associations', () => {
    const Chat = 'chat';
    before(() => {
      ChatGroup.associate({ Chat });
    });

    it('defined a hasMany association with Chat', () => {
      expect(ChatGroup.hasMany).to.have.been.calledWith(Chat);
    });
  });
});
