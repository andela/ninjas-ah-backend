/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import sinonChai from 'sinon-chai';

import {
  sequelize, dataTypes, checkModelName, checkPropertyExists
} from 'sequelize-test-helpers';

import UserModel from '../../models/user';

const { expect } = chai;
chai.use(sinonChai);

// test user model
describe('src/models/User', () => {
  const User = UserModel(sequelize, dataTypes);
  const user = new User();

  checkModelName(User)('User');

  context('properties', () => {
    [
      'id',
      'firstName',
      'lastName',
      'username',
      'email',
      'password',
      'bio',
      'image',
      'role',
      'permissions',
      'accountProvider',
      'accountProviderUserId',
      'createdAt',
      'updatedAt'
    ].forEach(checkPropertyExists(user));
  });

  context('check associations', () => {
    const Article = 'article';
    const Comment = 'comment';
    before(() => {
      User.associate({ Article });
      User.associate({ Comment });
    });

    it('defined a hasMany association with User', () => {
      expect(User.hasMany).to.have.been.calledWith(Article);
      expect(User.hasMany).to.have.been.calledWith(Comment);
    });
  });
});
