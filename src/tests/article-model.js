/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import sinonChai from 'sinon-chai';


import {
  sequelize,
  dataTypes,
  checkModelName,
  checkUniqueIndex,
  checkPropertyExists,
} from 'sequelize-test-helpers';

import ArticleModel from '../models/article';

const { expect } = chai;
chai.use(sinonChai);

// test article model
describe('src/models/Article', () => {
  const Article = ArticleModel(sequelize, dataTypes);
  const article = new Article();

  checkModelName(Article)('Article');

  context('properties', () => {
    ['id', 'userId', 'slug', 'title', 'description', 'body', 'tags', 'readTime', 'status', 'createdAt', 'updatedAt'].forEach(
      checkPropertyExists(article)
    );
  });

  context('check associations', () => {
    const User = 'user';
    before(() => {
      Article.associate({ User });
    });

    it('defined a belongsTo association with User', () => {
      expect(Article.belongsTo).to.have.been.calledWith(User);
    });
  });
});
