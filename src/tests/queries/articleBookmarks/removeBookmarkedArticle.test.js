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

describe('Delete Bookmark article query', () => {
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

  it('should remove a bookmark', async () => {
    bookmarkedArticles = await Article.bookmark.remove(createdUser.id, createdArticle.slug);
    expect(bookmarkedArticles).to.be.above(0);
    expect(bookmarkedArticles).to.not.include.keys('errors');
  });

  it('should not remove a bookmark if the article slug is not found', async () => {
    bookmarkedArticles = await Article.bookmark.remove(createdUser.id, 'invalid-slug');
    expect(bookmarkedArticles).be.equal(0);
    expect(bookmarkedArticles).to.not.include.keys('errors');
  });

  it('should not remove a bookmark if no provided parameter', async () => {
    bookmarkedArticles = await Article.bookmark.remove();
    expect(bookmarkedArticles).be.equal(null);
  });

  it('should throw an error if the parameters are not valid', async () => {
    bookmarkedArticles = await Article.bookmark.remove({}, {});
    expect(bookmarkedArticles).to.include.keys('errors');
  });
});
