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

describe('Bookmark article query', () => {
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

  it('should bookmark an article', async () => {
    const bookmarkedArticle = await Article.bookmark.add(createdUser.id, createdArticle.slug);
    expect(Object.keys(bookmarkedArticle).length).to.be.above(0);
    expect(bookmarkedArticle).to.not.include.keys('errors');
  });

  it('should not bookmark an article if the user has already bookmarked it', async () => {
    const bookmarkedArticle = await Article.bookmark.add(createdUser.id, createdArticle.slug);
    expect(bookmarkedArticle).to.include.keys('errors');
  });

  it('should not bookmark an article if the article slug is not provided', async () => {
    const bookmarkedArticle = await Article.bookmark.add(createdUser.id);
    expect(bookmarkedArticle).to.include.keys('errors');
  });

  it('should not bookmark an article if no parameter is provided', async () => {
    const bookmarkedArticle = await Article.bookmark.add();
    expect(bookmarkedArticle).to.include.keys('errors');
  });
});
