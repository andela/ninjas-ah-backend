/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import validateEmail from '../../../helpers/validation/email';

const { expect } = chai;

describe('Email validation', () => {
  it('should return an array of error messages', () => {
    expect(validateEmail('ab/c@gmail.com', 'required').length).to.be.above(0);
  });

  it('should return an array of error messages', () => {
    expect(validateEmail('abc@gma/il.com', 'required').length).to.be.above(0);
  });

  it('should return an array of error messages', () => {
    expect(validateEmail('abc@gmail.co/m', 'required').length).to.be.above(0);
  });

  it('should return an empty array if there is no error', () => {
    expect(validateEmail('abcd@gmail.com', 'required').length).to.be.equals(0);
    expect(validateEmail('', false).length).to.be.equals(0);
  });

  it('should return an empty array if no parameter', () => {
    expect(validateEmail().length).to.be.equals(0);
  });
});
