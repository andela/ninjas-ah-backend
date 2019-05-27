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

describe('Update token query', () => {
  before(async () => {
    try {
      await db.User.destroy({
        truncate: true,
        cascade: true,
        logging: false
      });
      createdUser = (await db.User.create(user, { logging: false })).dataValues;
      await db.Token.create({ token, userId: createdUser.id }, { logging: false });
    } catch (error) {
      throw error;
    }
  });

  it('should find a token', async () => {
    const foundToken = await Token.findOne(createdUser.id, token);
    expect(Object.keys(foundToken).length).to.be.above(0);
    expect(foundToken).to.not.include.keys('errors');
  });

  it('should not find a token if the token or the user ID is not provided', async () => {
    const foundToken = await Token.findOne(0, token);
    expect(Object.keys(foundToken).length).to.be.equal(0);
    expect(foundToken).to.not.include.keys('errors');
  });

  it('should not find a token if the parameter passed are invalid', async () => {
    const foundToken = await Token.findOne({});
    expect(foundToken).to.include.keys('errors');
  });

  it('should an empty object if there is no parameter passed', async () => {
    const foundToken = await Token.findOne();
    expect(Object.keys(foundToken).length).to.be.equal(0);
  });
});
