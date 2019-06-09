import chai from 'chai';
import db from '../../../models';
import { Article } from '../../../queries';
import * as helpers from '../../../helpers';

const { expect } = chai;

let createdArticle = '';
let userId = '';
let article = helpers.factory.article.build();
delete article.id;
delete article.tagList;
article.rating = 4;

describe('Get rating query', () => {
  before(async () => {
    const response = await db.User.findAll({ limit: 1, attributes: ['id'], logging: false });
    userId = response[0].dataValues.id;
    article = { ...article, userId, slug: helpers.generator.slug(article.slug) };
    createdArticle = await db.Article.create(article, { logging: false });
    return createdArticle;
  });
  it('Should get users who rated an article', async () => {
    const ratedArticle = await Article.rate.get();
    expect(Object.keys(ratedArticle).length).to.be.above(0);
  });
});
