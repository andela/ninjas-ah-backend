/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import db from '../../../models';
import { Token } from '../../../queries';
import * as Factory from '../../../helpers/factory';

const { expect } = chai;

let createdUser = '';
const user = Factory.user.build();
const { token } = Factory.token.build();

delete user.id;

describe('Create token query', () => {
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

  it('should save a token', async () => {
    const savedToken = await Token.save(token, createdUser.id);
    expect(Object.keys(savedToken).length).to.be.above(0);
    expect(savedToken).to.not.include.keys('errors');
  });

  it('should not save a token if the user ID is not provided', async () => {
    const savedToken = await Token.save(token);
    expect(savedToken).to.include.keys('errors');
  });

  it('should not save a token if the parameter passed is invalid', async () => {
    const savedToken = await Token.save('~~~');
    expect(savedToken).to.include.keys('errors');
  });

  it('should not save a token if there is no passed parameter', async () => {
    const savedToken = await Token.save();
    expect(savedToken).to.include.keys('errors');
  });
});
