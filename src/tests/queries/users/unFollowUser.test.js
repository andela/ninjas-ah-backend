/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import { User } from '../../../queries';

const { expect } = chai;

describe('Find follow query', () => {
  it('should fail ', async () => {
    const Follow = await User.follow.remove({ userId: 0, following: '-' });
    expect(Object.keys(Follow).length).to.be.above(0);
  });
});
