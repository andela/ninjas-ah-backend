/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import * as Factory from '../../helpers/factory';
import passportConfig from '../../config/passportConfig';

const { expect } = chai;

chai.use(chaiHttp);

const done = (err, profile) => profile;
const [user, profile] = [Factory.user.build(), Factory.user.build()];
const [accessToken, token] = ['agdy7536dg', 'agdy7536dg'];
const [refreshToken, tokenSecret] = ['agdy7536dg', 'agdy7536dg'];

describe('Passport config', () => {
  describe('FacebookStrategy', () => {
    it('should return user information from the callback', () => {
      const result = passportConfig.facebook.callbackFunc(accessToken, refreshToken, profile, done);
      expect(Object.keys(result).length).to.be.above(0);
    });
  });

  describe('TwitterStrategy', () => {
    it('should return user information from the callback', () => {
      const result = passportConfig.twitter.callbackFunc(token, tokenSecret, profile, done);
      expect(Object.keys(result).length).to.be.above(0);
    });
  });

  describe('OAuthStrategy', () => {
    it('should return user information from  callback', () => {
      const result = passportConfig.google.callbackFunc(accessToken, refreshToken, profile, done);
      expect(Object.keys(result).length).to.be.above(0);
    });
  });

  describe('OAuth2Strategy', () => {
    it('should return user information from  callback', () => {
      const result = passportConfig.google2.callbackFunc(accessToken, refreshToken, profile, done);
      expect(Object.keys(result).length).to.be.above(0);
    });
  });

  describe('Serialize user information', () => {
    it('should serialize user information', () => {
      const result = passportConfig.serializeUser(user, done);
      expect(Object.keys(result).length).to.be.above(0);
    });
  });

  describe('Deserialize user information', () => {
    it('should deserialize user information', () => {
      const result = passportConfig.deserializeUser(user, done);
      expect(Object.keys(result).length).to.be.above(0);
    });
  });
});
