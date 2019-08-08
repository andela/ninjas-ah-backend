/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import db from '../../../models';
import { User } from '../../../queries';
import * as Factory from '../../../helpers/factory';

const { expect } = chai;

const user = Factory.user.build();
delete user.id;

describe('Find or create user query', () => {
  before(async () => {
    try {
      await db.User.destroy({
        truncate: true,
        cascade: true,
        logging: false
      });
    } catch (error) {
      throw error;
    }
  });

  it('should throw an error message', async () => {
    const newOrExistingUser = await User.findOrCreate();
    expect(newOrExistingUser).to.include.keys('errors');
  });

  it('should create a user account', async () => {
    const newOrExistingUser = await User.findOrCreate({ email: user.email }, user);
    expect(Object.keys(newOrExistingUser[0]).length).to.be.above(0);
    expect(newOrExistingUser[1]).to.be.equal(true);
  });

  it('should not create a user account', async () => {
    const newOrExistingUser = await User.findOrCreate({ email: user.email }, user);
    expect(Object.keys(newOrExistingUser[0]).length).to.be.above(0);
    expect(newOrExistingUser[1]).to.be.equal(false);
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
