/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import db from '../../../models';
import { Article } from '../../../queries';
import * as Factory from '../../../helpers/factory';

const { expect } = chai;

let createdUser = '';
let createdArticle = '';
let favoritedArticles = '';

const user = Factory.user.build();
const article = Factory.article.build();

delete user.id;
delete article.id;

describe('Get favorited articles query', () => {
  before(async () => {
    try {
      await db.User.destroy({
        truncate: true,
        cascade: true,
        logging: false
      });
      createdUser = (await db.User.create(user, { logging: false })).dataValues;
      article.userId = createdUser.id;
      createdArticle = (await db.Article.create(article, { logging: false })).dataValues;
      await db.FavoriteArticle.create(
        { userId: createdUser.id, articleSlug: createdArticle.slug },
        { logging: false }
      );
    } catch (error) {
      throw error;
    }
  });

  it('should get all favorited articles', async () => {
    favoritedArticles = await Article.favorite.getAll(createdUser.id);
    expect(favoritedArticles.length).to.be.above(0);
    expect(favoritedArticles).to.not.include.keys('errors');
  });

  it('should not get all favorited articles if the user ID is not found', async () => {
    favoritedArticles = await Article.favorite.getAll(0);
    expect(favoritedArticles.length).be.equal(0);
    expect(favoritedArticles).to.not.include.keys('errors');
  });

  it('should not get all favorited articles if no provided parameter', async () => {
    favoritedArticles = await Article.favorite.getAll();
    expect(favoritedArticles.length).be.equal(0);
    expect(favoritedArticles).to.not.include.keys('errors');
  });

  it('should not throw an error if the user ID is not valid', async () => {
    favoritedArticles = await Article.favorite.getAll(['~~~']);
    expect(favoritedArticles).to.include.keys('errors');
  });
});
