/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import sinonChai from 'sinon-chai';

import {
  sequelize, dataTypes, checkModelName, checkPropertyExists
} from 'sequelize-test-helpers';

import TokenModel from '../../models/token';

const { expect } = chai;
chai.use(sinonChai);

// test token model
describe('src/models/Token', () => {
  const Token = TokenModel(sequelize, dataTypes);
  const token = new Token();

  checkModelName(Token)('Token');

  context('properties', () => {
    ['id', 'userId', 'token', 'createdAt', 'updatedAt'].forEach(checkPropertyExists(token));
  });

  context('check associations', () => {
    const User = 'user';
    before(() => {
      Token.associate({ User });
    });

    it('defined a belongsTo association with User', () => {
      expect(Token.belongsTo).to.have.been.calledWith(User);
    });
  });
});
