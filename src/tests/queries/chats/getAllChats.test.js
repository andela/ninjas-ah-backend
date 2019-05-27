/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import db from '../../../models';
import { Chat } from '../../../queries';
import * as Factory from '../../../helpers/factory';

const { expect } = chai;

let createdUser = '';
let createdChat = '';
const user = Factory.user.build();
const message = 'Hello';

delete user.id;

describe('Get chats query', () => {
  before(async () => {
    try {
      await db.User.destroy({
        truncate: true,
        cascade: true,
        logging: false
      });
      createdUser = (await db.User.create(user, { logging: false })).dataValues;
      createdChat = (await db.Chat.create({ userId: createdUser.id, message }, { logging: false }))
        .dataValues;
    } catch (error) {
      throw error;
    }
  });

  it('should get chats', async () => {
    const chats = await Chat.getAll();
    expect(chats.length).to.be.above(0);
    expect(chats).to.not.include.keys('errors');
  });

  it('should not get chats if there are no more chats', async () => {
    const chats = await Chat.getAll(100);
    expect(chats.length).to.be.equal(0);
  });

  it('should not get chats if the parameters passed are not numbers', async () => {
    const chats = await Chat.getAll({}, {});
    expect(chats).to.include.keys('errors');
  });
});
