/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import db from '../../../models';
import { User } from '../../../queries';
import * as Factory from '../../../helpers/factory';

const { expect } = chai;

const user = Factory.user.build();
delete user.id;

describe('Update user query', () => {
  before(async () => {
    try {
      user.email = Factory.user.build().email;
      await db.User.destroy({
        where: { email: user.email },
        logging: false
      });
      await db.User.create(user, { logging: false });
    } catch (error) {
      throw error;
    }
  });

  it('should update user information', async () => {
    const isUpdated = await User.update({ password: '12345' }, { email: user.email });
    expect(isUpdated).to.be.equal(true);
  });

  it('should not update a user account', async () => {
    const isUpdated = await User.update({ password: '12345' }, { email: 'aaa' });
    expect(isUpdated).to.be.equal(false);
  });

  it('should throw an error message', async () => {
    const isUpdated = await User.update({}, '~~');
    expect(isUpdated).to.include.keys('errors');
  });

  after(async () => {
    try {
      user.email = Factory.user.build().email;
      await db.User.destroy({
        where: { email: user.email },
        logging: false
      });
    } catch (error) {
      throw error;
    }
  });
});
