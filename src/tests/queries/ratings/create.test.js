import chai from 'chai';
import db from '../../../models';
import { Article } from '../../../queries';
import * as Factory from '../../../helpers/factory';

const { expect } = chai;
chai.should();

let createdArticle = '';
let userId = '';
const RATING = 3;
let createdUser = '';
let article = Factory.article.build();
const user = Factory.user.build();
delete article.id;
delete article.tagList;
delete user.id;
user.email = 'ratingquery@haven.com';
user.username = 'ratingquery123';
article.slug = 'rosie-make-it-easy-gfkjfh1242';

describe('Create rating query', () => {
  before(async () => {
    createdUser = (await db.User.create(user, { logging: false })).dataValues;
    userId = createdUser.id;
    article = { ...article, userId };
    createdArticle = await db.Article.create(article, { logging: false });
    return createdArticle;
  });

  it('Should create rating', async () => {
    const data = {
      rating: RATING,
      articleId: createdArticle.dataValues.id,
      userId
    };
    const savedRating = await Article.rate.create(data);
    expect(Object.keys(savedRating).length).to.be.above(0);
    expect(savedRating).to.not.include.keys('errors');
  });

  it('Should not create or update rating', async () => {
    const fakeData = {
      rating: 1,
      articleId: 12312,
      userId: 143234345464
    };
    const savedRating = await Article.rate.create(fakeData);
    expect(savedRating).to.include.keys('errors');
  });

  it('Should not create or update rating', async () => {
    const savedRating = await Article.rate.create();
    expect(savedRating).to.include.keys('errors');
  });
});
