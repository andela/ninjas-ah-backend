/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import tokenDecoder from '../../../helpers/tokens/tokenDecoder';

dotenv.config();

const { expect } = chai;

const token = jwt.sign({ payload: 'my payload' }, process.env.SECRET_KEY, { expiresIn: '1d' });

describe('Token decodor', () => {
  it('should return an object containing the decoded token', () => {
    const decodedToken = tokenDecoder(token);
    expect(decodedToken).to.not.include.keys('errors');
  });

  it('should not return the decoded token if the token is not valid', () => {
    const decodedToken = tokenDecoder('token');
    expect(decodedToken).to.include.keys('errors');
  });

  it('should not return the decoded token if the token is not passed', () => {
    const decodedToken = tokenDecoder();
    expect(decodedToken).to.include.keys('errors');
  });
});
