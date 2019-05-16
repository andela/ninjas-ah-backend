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

describe('Destroy token query', () => {
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

  it('should destroy a token', async () => {
    const destroyedToken = await Token.destroy(createdUser.id);
    expect(destroyedToken).to.be.above(0);
    expect(destroyedToken).to.not.include.keys('errors');
  });

  it('should not destroy a token if the user ID is not found', async () => {
    const destroyedToken = await Token.destroy(0);
    expect(destroyedToken).to.be.equal(0);
  });

  it('should not destroy a token if the parameter passed is invalid', async () => {
    const destroyedToken = await Token.destroy({});
    expect(destroyedToken).to.include.keys('errors');
  });

  it('should not destroy a token if there is no passed parameter', async () => {
    const destroyedToken = await Token.destroy();
    expect(destroyedToken).to.be.equal(0);
  });
});
