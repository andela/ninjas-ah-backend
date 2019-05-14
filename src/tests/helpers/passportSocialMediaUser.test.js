/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import * as Factory from '../../helpers/factory';
import passportSocialMediaUser from '../../helpers/passportSocialMediaUser';

const { expect } = chai;

const userFacebook = Factory.userFacebook.build();
const userTwitter = Factory.userTwitter.build();
const userGoogle = Factory.userGoogle.build();

describe('passportSocialMediaUser', () => {
  it('should return an object containing user information', () => {
    const user = passportSocialMediaUser(userFacebook);
    expect(Object.keys(user).length).to.be.above(0);
  });

  it('should return an object containing user information', () => {
    const user = passportSocialMediaUser(userTwitter);
    expect(Object.keys(user).length).to.be.above(0);
  });

  it('should return an empty object', () => {
    const user = passportSocialMediaUser({});
    expect(Object.keys(user).length).to.be.equals(0);
  });

  it('should return an empty object if no parameter', () => {
    const user = passportSocialMediaUser();
    expect(Object.keys(user).length).to.be.equals(0);
  });
});
