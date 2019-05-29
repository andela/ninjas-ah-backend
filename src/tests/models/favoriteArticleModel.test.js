/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import sinonChai from 'sinon-chai';

import {
  sequelize, dataTypes, checkModelName, checkPropertyExists
} from 'sequelize-test-helpers';

import FavoriteArticleModel from '../../models/favoritearticle';

const { expect } = chai;
chai.use(sinonChai);

// test favoritearticle model
describe('src/models/FavoriteArticle', () => {
  const FavoriteArticle = FavoriteArticleModel(sequelize, dataTypes);
  const favoritearticle = new FavoriteArticle();

  checkModelName(FavoriteArticle)('FavoriteArticle');

  context('properties', () => {
    ['userId', 'articleSlug', 'createdAt', 'updatedAt'].forEach(
      checkPropertyExists(favoritearticle)
    );
  });

  context('check associations', () => {
    const User = 'user';
    before(() => {
      FavoriteArticle.associate({ User });
    });

    it('defined a belongsTo association with User', () => {
      expect(FavoriteArticle.belongsTo).to.have.been.calledWith(User);
    });
  });
});
