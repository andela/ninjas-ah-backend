/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import db from '../../../models';
import { User } from '../../../queries';
import * as Factory from '../../../helpers/factory';

const { expect } = chai;

const user = Factory.user.build();
delete user.id;

describe('Create user query', () => {
  before(async () => {
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

  it('should create a user account', async () => {
    const newUser = await User.create(user);
    expect(Object.keys(newUser).length).to.be.above(0);
  });

  it('should not create a user account', async () => {
    const newUser = await User.create({});
    expect(newUser).to.include.keys('errors');
  });

  it('should throw an error message', async () => {
    const newUser = await User.create('~~~');
    expect(newUser).to.include.keys('errors');
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
