/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import dotenv from 'dotenv';
import db from '../../../models';
import * as Factory from '../../../helpers/factory';
import publishArticle from '../../../helpers/notifications/publishArticle';

dotenv.config();

const { expect } = chai;

let createdUserOne = '';
let createdUserTwo = '';
let createdArticle = '';
let createdConfig = '';
let createdFollow = '';

const userOne = Factory.user.build();
const userTwo = Factory.user.build();
const article = Factory.article.build();
const notificationConfig = Factory.notificationConfig.build();

delete userOne.id;
delete userTwo.id;
delete article.id;

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
      createdFollow = (await db.Follows.create(
        { userId: createdUserTwo.id, followed: createdUserOne.id },
        { logging: false }
      )).get();
    } catch (error) {
      throw error;
    }
  });

  it('should notify a user when an user they follow published an article', async () => {
    const notifications = await publishArticle(createdUserOne.id, createdArticle.slug);
    expect(notifications).to.not.include.keys('errors');
  });

  it('should not notify a user if no parameter is passed', async () => {
    const notifications = await publishArticle();
    expect(notifications).to.include.keys('errors');
  });
});
