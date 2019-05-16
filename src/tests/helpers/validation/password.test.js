/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import validatePassword from '../../../helpers/validation/password';

const { expect } = chai;

describe('Password validation', () => {
  it('should return an array of error messages', () => {
    expect(validatePassword('abcde12345', 'required').length).to.be.above(0);
  });

  it('should return an array of error messages', () => {
    expect(validatePassword('abcd', 'required').length).to.be.above(0);
  });

  it('should return an array of error messages', () => {
    expect(validatePassword('abcdefgh', 'required').length).to.be.above(0);
  });

  it('should return an array of error messages', () => {
    expect(validatePassword('12345678', 'required').length).to.be.above(0);
  });

  it('should return an array of error messages', () => {
    expect(validatePassword('Abcde12345', 'required').length).to.be.above(0);
  });

  it('should return an empty array if there is no error', () => {
    expect(validatePassword('Abcde12345!', 'required').length).to.be.equals(0);
    expect(validatePassword('', false).length).to.be.equals(0);
  });

  it('should return an empty array if no parameter', () => {
    expect(validatePassword().length).to.be.equals(0);
  });
});
