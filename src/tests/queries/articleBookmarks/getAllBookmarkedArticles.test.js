/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import db from '../../../models';
import { Article } from '../../../queries';
import * as Factory from '../../../helpers/factory';

const { expect } = chai;

let createdUser = '';
let createdArticle = '';
let bookmarkedArticles = '';

const user = Factory.user.build();
const article = Factory.article.build();

delete user.id;
delete article.id;

describe('Get Bookmarks article query', () => {
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
      await db.ArticleBookmark.create(
        { userId: createdUser.id, articleSlug: createdArticle.slug },
        { logging: false }
      );
    } catch (error) {
      throw error;
    }
  });

  it('should get all bookmarks', async () => {
    bookmarkedArticles = await Article.bookmark.getAll(createdUser.id);
    expect(bookmarkedArticles.length).to.be.above(0);
    expect(bookmarkedArticles).to.not.include.keys('errors');
  });

  it('should not get all bookmarks if the user ID is not found', async () => {
    bookmarkedArticles = await Article.bookmark.getAll(0);
    expect(bookmarkedArticles.length).be.equal(0);
    expect(bookmarkedArticles).to.not.include.keys('errors');
  });

  it('should not get all bookmarks if no provided parameter', async () => {
    bookmarkedArticles = await Article.bookmark.getAll();
    expect(bookmarkedArticles.length).be.equal(0);
    expect(bookmarkedArticles).to.not.include.keys('errors');
  });

  it('should not throw an error if the user ID is not valid', async () => {
    bookmarkedArticles = await Article.bookmark.getAll(['~~~']);
    expect(bookmarkedArticles).to.include.keys('errors');
  });
});
