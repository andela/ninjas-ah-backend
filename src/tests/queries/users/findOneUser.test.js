/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import db from '../../../models';
import { User } from '../../../queries';
import * as Factory from '../../../helpers/factory';

const { expect } = chai;

const newUser = Factory.user.build();
delete newUser.id;

describe('Find user query', () => {
  before(async () => {
    try {
      await db.User.destroy({
        truncate: true,
        cascade: true,
        logging: false
      });
      await db.User.create(newUser, { logging: false });
    } catch (error) {
      throw error;
    }
  });

  it('should return the user information', async () => {
    const findUser = await User.findOne({ email: newUser.email });
    expect(Object.keys(findUser).length).to.be.above(0);
  });

  it('should not return the user information', async () => {
    const findUser = await User.findOne({ email: 'xxxxx@gmail.com' });
    expect(Object.keys(findUser).length).to.be.equals(0);
  });

  it('should throw an error message', async () => {
    const findUser = await User.findOne('~~');
    expect(findUser).to.include.keys('errors');
  });

  it('should an empty object if there is no parameter passed', async () => {
    const findUser = await User.findOne();
    expect(Object.keys(findUser).length).to.be.equal(0);
  });

  after(async () => {
    try {
      newUser.email = Factory.user.build().email;
      await db.User.destroy({
        where: { email: newUser.email },
        logging: false
      });
    } catch (error) {
      throw error;
    }
  });
});
