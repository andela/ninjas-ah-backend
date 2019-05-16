/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import tokenGenerator from '../../../helpers/tokens/tokenGenerator';

const { expect } = chai;

describe('Token generator', () => {
  it('should return a token if the payload is specified', () => {
    expect(tokenGenerator({ payload: 'payload' }).length).to.be.above(0);
  });

  it('should not return a token if the payload is null', () => {
    expect(tokenGenerator(null)).to.be.equal(null);
  });

  it('should not return a token if the payload is a number', () => {
    expect(tokenGenerator(1)).to.be.equal(null);
  });

  it('should not return a token if the payload is an empty object', () => {
    expect(tokenGenerator({})).to.be.equal(null);
  });

  it('should not return a token if no parameter is passed', () => {
    expect(tokenGenerator()).to.be.equal(null);
  });
});
