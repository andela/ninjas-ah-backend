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

  it('should update a token', async () => {
    const updatedToken = await Token.update(token, createdUser.id);
    expect(Object.keys(updatedToken).length).to.be.above(0);
    expect(updatedToken).to.not.include.keys('errors');
  });

  it('should not update a token if the user ID is not provided', async () => {
    const updatedToken = await Token.update(token);
    expect(Object.keys(updatedToken).length).to.be.equal(0);
  });

  it('should not update a token if the parameter passed is invalid', async () => {
    const updatedToken = await Token.update({}, {});
    expect(updatedToken).to.include.keys('errors');
  });

  it('should not update a token if there is no passed parameter', async () => {
    const updatedToken = await Token.update();
    expect(Object.keys(updatedToken).length).to.be.equal(0);
  });
});
