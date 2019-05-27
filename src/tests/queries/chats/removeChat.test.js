/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import db from '../../../models';
import { Chat } from '../../../queries';
import * as Factory from '../../../helpers/factory';

const { expect } = chai;

let createdUser = '';
let createdChatOne = '';
let createdChatTwo = '';
const user = Factory.user.build();
const message = 'Hello';

delete user.id;

describe('Remove chat query', () => {
  before(async () => {
    try {
      await db.User.destroy({
        truncate: true,
        cascade: true,
        logging: false
      });
      createdUser = (await db.User.create(user, { logging: false })).dataValues;
      createdChatOne = (await db.Chat.create(
        { userId: createdUser.id, message },
        { logging: false }
      )).dataValues;
      createdChatTwo = (await db.Chat.create(
        { userId: createdUser.id, message },
        { logging: false }
      )).dataValues;
    } catch (error) {
      throw error;
    }
  });

  it('should remove a chat', async () => {
    const removedChat = await Chat.remove(createdChatOne.id);
    expect(removedChat).to.be.above(0);
    expect(removedChat).to.not.include.keys('errors');
  });

  it('should not remove a chat if the chat ID is not found', async () => {
    const removedChat = await Chat.remove(0);
    expect(removedChat).to.be.equal(0);
  });

  it('should not remove a chat if the user ID is not found', async () => {
    const removedChat = await Chat.remove(createdChatTwo.id, createdUser.id * 2);
    expect(removedChat).to.be.equal(0);
  });

  it('should remove a chat', async () => {
    const removedChat = await Chat.remove(createdChatTwo.id, createdUser.id);
    expect(removedChat).to.be.above(0);
    expect(removedChat).to.not.include.keys('errors');
  });

  it('should not remove a chat if the parameter passed is invalid', async () => {
    const removedChat = await Chat.remove({});
    expect(removedChat).to.include.keys('errors');
  });

  it('should not remove a chat if there is no passed parameter', async () => {
    const removedChat = await Chat.remove();
    expect(removedChat).to.be.equal(0);
  });
});
