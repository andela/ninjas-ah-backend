/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import sinonChai from 'sinon-chai';

import {
  sequelize, dataTypes, checkModelName, checkPropertyExists
} from 'sequelize-test-helpers';

import ChatGroupMemberMemberModel from '../../models/chatgroupmember';

const { expect } = chai;
chai.use(sinonChai);

// test chatgroupmember model
describe('src/models/ChatGroupMember', () => {
  const ChatGroupMember = ChatGroupMemberMemberModel(sequelize, dataTypes);
  const chatgroupmember = new ChatGroupMember();

  checkModelName(ChatGroupMember)('ChatGroupMember');

  context('properties', () => {
    ['chatGroupId', 'userId', 'createdAt', 'updatedAt'].forEach(
      checkPropertyExists(chatgroupmember)
    );
  });

  context('check associations', () => {
    const User = 'user';
    const ChatGroup = 'chatgroup';

    before(() => {
      ChatGroupMember.associate({ User });
      ChatGroupMember.associate({ ChatGroup });
    });

    it('defined a belongsTo association with User', () => {
      expect(ChatGroupMember.belongsTo).to.have.been.calledWith(User);
    });

    it('defined a belongsTo association with User', () => {
      expect(ChatGroupMember.belongsTo).to.have.been.calledWith(ChatGroup);
    });
  });
});
