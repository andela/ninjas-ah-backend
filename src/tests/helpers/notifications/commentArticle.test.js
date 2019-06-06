/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import dotenv from 'dotenv';
import db from '../../../models';
import * as Factory from '../../../helpers/factory';
import commentArticle from '../../../helpers/notifications/commentArticle';

dotenv.config();

const { expect } = chai;

let createdUserOne = '';
let createdUserTwo = '';
let createdArticle = '';
let createdConfig = '';
let createdFavorite = '';
let createdComment = '';

const userOne = Factory.user.build();
const userTwo = Factory.user.build();
const article = Factory.article.build();
const comment = Factory.comment.build();
const notificationConfig = Factory.notificationConfig.build();

delete userOne.id;
delete userTwo.id;
delete article.id;
delete comment.id;

userTwo.email = 'aaa@bbb.ccc';
userTwo.username = 'aaabbb';

describe('Publish article notification', () => {
  before(async () => {
    try {
      await db.User.destroy({
        truncate: true,
        cascade: true,
        logging: false
      });

      createdUserOne = (await db.User.create(userOne, { logging: false })).get();
      article.userId = createdUserOne.id;
      createdArticle = (await db.Article.create(article, { logging: false })).get();

      createdUserTwo = (await db.User.create(userTwo, { logging: false })).get();
      notificationConfig.userId = createdUserTwo.id;
      notificationConfig.config = JSON.stringify(notificationConfig.config);

      createdConfig = (await db.NotificationConfig.create(notificationConfig, {
        logging: false
      })).get();

      createdFavorite = (await db.FavoriteArticle.create(
        { userId: createdUserTwo.id, articleSlug: createdArticle.slug },
        { logging: false }
      )).get();

      comment.userId = createdUserOne.id;
      comment.articleSlug = createdArticle.slug;
      createdComment = (await db.Comment.create(comment, { logging: false })).get();
    } catch (error) {
      throw error;
    }
  });

  it('should notify a user when an article they favorite has new comment', async () => {
    const notifications = await commentArticle(createdComment);
    expect(notifications).to.not.include.keys('errors');
  });

  it('should not notify a user if no parameter is passed', async () => {
    const notifications = await commentArticle();
    expect(notifications).to.include.keys('errors');
  });
});
