/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import tokenGenerator from '../../helpers/tokenGenerator';

const { expect } = chai;

describe('Token generator', () => {
  it('should return a token if the payload is specified', () => {
    expect(tokenGenerator({ payload: 'payload' }).length).to.be.above(0);
  });

  it('should not return a token if the payload is empty', () => {
    expect(tokenGenerator({}).length).to.be.equal(0);
  });

  it('should not return a token if the payload is incorrect', () => {
    expect(tokenGenerator(['payload'])).to.be.equal(null);
  });
});
