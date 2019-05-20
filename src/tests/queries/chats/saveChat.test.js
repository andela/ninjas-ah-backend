/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import db from '../../../models';
import { Chat } from '../../../queries';
import * as Factory from '../../../helpers/factory';

const { expect } = chai;

let createdUser = '';
const user = Factory.user.build();
const message = 'Hello';

delete user.id;

describe('Save chat query', () => {
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

  it('should save a chat', async () => {
    const savedChat = await Chat.save(createdUser.id, message);
    expect(Object.keys(savedChat).length).to.be.above(0);
    expect(savedChat).to.not.include.keys('errors');
  });

  it('should not save a chat if the user does not exist', async () => {
    const savedChat = await Chat.save(0, message);
    expect(savedChat).to.include.keys('errors');
  });

  it('should not save a chat if the message is empty', async () => {
    const savedChat = await Chat.save(createdUser.id, null);
    expect(savedChat).to.include.keys('errors');
  });

  it('should not save a chat if the parameter passed is invalid', async () => {
    const savedChat = await Chat.save('~~~');
    expect(savedChat).to.include.keys('errors');
  });

  it('should not save a chat if there is no passed parameter', async () => {
    const savedChat = await Chat.save();
    expect(savedChat).to.include.keys('errors');
  });
});
