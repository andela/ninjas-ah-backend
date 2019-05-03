/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import db from '../../models';
import { User } from '../../queries';
import * as Factory from '../../helpers/factory';

const { expect } = chai;

const newUser = Factory.user.build();
delete newUser.id;

describe('User queries', () => {
  describe('Find user', () => {
    before(async () => {
      try {
        await db.User.create(newUser, { logging: false });
      } catch (error) {
        throw error;
      }
    });

    it('should return the user information', async () => {
      const findUser = await User.findOne({ email: newUser.email });
      expect(Object.keys(findUser).length).to.be.above(0);
    });

    it('should throw an error message', async () => {
      const findUser = await User.findOne('~~');
      expect(findUser).to.include.keys('errors');
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
});
