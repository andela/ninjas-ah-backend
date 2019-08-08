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
    const updatedUser = await User.update({ password: '12345' }, { email: user.email });
    expect(Object.keys(updatedUser).length).to.be.above(0);
  });

  it('should not update a user account', async () => {
    const updatedUser = await User.update({ password: '12345' }, { email: 'aaa' });
    expect(Object.keys(updatedUser).length).to.be.equal(0);
  });

  it('should throw an error message', async () => {
    const updatedUser = await User.update({}, '~~');
    expect(updatedUser).to.include.keys('errors');
  });

  it('should throw an error message if no parameter is passed', async () => {
    const updatedUser = await User.update();
    expect(Object.keys(updatedUser).length).to.be.equal(0);
  });
});
