/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import sinonChai from 'sinon-chai';

import {
  sequelize, dataTypes, checkModelName, checkPropertyExists
} from 'sequelize-test-helpers';

import ChatModel from '../../models/chat';

const { expect } = chai;
chai.use(sinonChai);

// test chat model
describe('src/models/Chat', () => {
  const Chat = ChatModel(sequelize, dataTypes);
  const chat = new Chat();

  checkModelName(Chat)('Chat');

  context('properties', () => {
    ['id', 'userId', 'message', 'chatGroupId', 'createdAt', 'updatedAt'].forEach(
      checkPropertyExists(chat)
    );
  });

  context('check associations', () => {
    const User = 'user';
    const ChatGroup = 'chatgroup';
    before(() => {
      Chat.associate({ User });
      Chat.associate({ ChatGroup });
    });

    it('defined a belongsTo association with User', () => {
      expect(Chat.belongsTo).to.have.been.calledWith(User);
    });

    it('defined a belongsTo association with ChatGroup', () => {
      expect(Chat.belongsTo).to.have.been.calledWith(ChatGroup);
    });
  });
});
