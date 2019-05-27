/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import db from '../../../models';
import { Token } from '../../../queries';
import * as Factory from '../../../helpers/factory';

const { expect } = chai;

let createdUser = '';
let createdToken = '';
const user = Factory.user.build();
const { token } = Factory.token.build();

delete user.id;

describe('Destroy token query', () => {
  before(async () => {
    try {
      await db.User.destroy({
        truncate: true,
        cascade: true,
        logging: false
      });
      createdUser = (await db.User.create(user, { logging: false })).dataValues;
      createdToken = await db.Token.create(
        {
          token,
          userId: createdUser.id,
          createdAt: new Date(new Date() - 24 * 60 * 60 * 1000)
        },
        { logging: true }
      );
    } catch (error) {
      throw error;
    }
  });

  it('should destroy a token', async () => {
    const destroyedToken = await Token.destroy(createdUser.id);
    expect(destroyedToken).to.be.above(0);
    expect(destroyedToken).to.not.include.keys('errors');
  });

  it('should not destroy a token if no expired token found', async () => {
    const destroyedToken = await Token.destroy(createdUser.id);
    expect(destroyedToken).to.be.equal(0);
  });

  it('should throw an error if the parameter is not a integer', async () => {
    const destroyedToken = await Token.destroy({});
    expect(destroyedToken).to.include.keys('errors');
  });
});
