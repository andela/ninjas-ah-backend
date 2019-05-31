/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import db from '../../../models';
import { Article } from '../../../queries';
import * as Factory from '../../../helpers/factory';

const { expect } = chai;

let createdUser = '';
let createdArticle = '';

const user = Factory.user.build();
const article = Factory.article.build();

delete user.id;
delete article.id;

describe('Favorite article query', () => {
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
    } catch (error) {
      throw error;
    }
  });

  it('should favorite an article', async () => {
    const favoritedArticle = await Article.favorite.add(createdUser.id, createdArticle.slug, 1);
    expect(Object.keys(favoritedArticle).length).to.be.above(0);
    expect(favoritedArticle).to.not.include.keys('errors');
  });

  it('should not favorite an article if the user has already favorited it', async () => {
    const favoritedArticle = await Article.favorite.add(createdUser.id, createdArticle.slug, 1);
    expect(favoritedArticle).to.include.keys('errors');
  });

  it('should not favorite an article if the article slug is not provided', async () => {
    const favoritedArticle = await Article.favorite.add(createdUser.id);
    expect(favoritedArticle).to.include.keys('errors');
  });

  it('should not favorite an article if no parameter is provided', async () => {
    const favoritedArticle = await Article.favorite.add();
    expect(favoritedArticle).to.include.keys('errors');
  });
});
