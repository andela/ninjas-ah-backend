/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import sinonChai from 'sinon-chai';

import {
  sequelize, dataTypes, checkModelName, checkPropertyExists
} from 'sequelize-test-helpers';

import ArticleBookmarkModel from '../../models/articlebookmark';

const { expect } = chai;
chai.use(sinonChai);

// test articlebookmark model
describe('src/models/ArticleBookmark', () => {
  const ArticleBookmark = ArticleBookmarkModel(sequelize, dataTypes);
  const articlebookmark = new ArticleBookmark();

  checkModelName(ArticleBookmark)('ArticleBookmark');

  context('properties', () => {
    ['userId', 'articleSlug', 'createdAt', 'updatedAt'].forEach(
      checkPropertyExists(articlebookmark)
    );
  });

  context('check associations', () => {
    const User = 'user';
    before(() => {
      ArticleBookmark.associate({ User });
    });

    it('defined a belongsTo association with User', () => {
      expect(ArticleBookmark.belongsTo).to.have.been.calledWith(User);
    });
  });
});
