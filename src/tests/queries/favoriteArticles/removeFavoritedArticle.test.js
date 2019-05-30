/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import db from '../../../models';
import { Article } from '../../../queries';
import * as Factory from '../../../helpers/factory';

const { expect } = chai;

let createdUser = '';
let createdArticle = '';
let favoritedArticle = '';

const user = Factory.user.build();
const article = Factory.article.build();

delete user.id;
delete article.id;

describe('Delete favorited article query', () => {
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

  it('should remove a favorited article', async () => {
    favoritedArticle = await Article.favorite.remove(createdUser.id, createdArticle.slug, 1);
    expect(favoritedArticle).to.be.above(0);
    expect(favoritedArticle).to.not.include.keys('errors');
  });

  it('should not remove a favorited article if the article slug is not found', async () => {
    favoritedArticle = await Article.favorite.remove(createdUser.id, 'invalid-slug', 1);
    expect(favoritedArticle).be.equal(0);
    expect(favoritedArticle).to.not.include.keys('errors');
  });

  it('should not remove a favorited article if no provided parameter', async () => {
    favoritedArticle = await Article.favorite.remove();
    expect(favoritedArticle).to.include.keys('errors');
  });

  it('should throw an error if the parameters are not valid', async () => {
    favoritedArticle = await Article.favorite.remove({}, {}, 1);
    expect(favoritedArticle).to.include.keys('errors');
  });
});
