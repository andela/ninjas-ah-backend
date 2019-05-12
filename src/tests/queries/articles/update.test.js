// eslint-disable-next-line import/no-extraneous-dependencies
import chai from 'chai';
// eslint-disable-next-line import/no-extraneous-dependencies
import chaiHttp from 'chai-http';
import { Article } from '../../../queries';
import db from '../../../models';

const { expect } = chai;
chai.use(chaiHttp);
// This is to test the query that is used to update data of a given article
describe('Query to edit an article', () => {
  it('should edit an article', async () => {
    // find article to update
    const findArticle = await db.Article.findAll({ limit: 1, logging: false });
    const {
      title,
      body,
      description,
      readTime,
      coverUrl,
      slug,
      userId
    } = findArticle[0].dataValues;
    const response = await Article.create(
      {
        userId,
        title,
        body,
        description,
        readTime,
        coverUrl
      },
      slug
    );
    expect(response).to.include.keys('dataValues');
    expect(response.dataValues).to.include.keys('id');
    expect(response.dataValues).to.include.keys('title');
    expect(response.dataValues).to.include.keys('body');
    expect(response.dataValues).to.include.keys('description');
    expect(response.dataValues).to.include.keys('status');
    expect(response.dataValues).to.include.keys('readTime');
    expect(response.dataValues).to.include.keys('coverUrl');
    expect(response.dataValues).to.include.keys('tagList');
    expect(response.dataValues).to.include.keys('slug');
    expect(response.dataValues).to.include.keys('tagList');
    expect(response.dataValues).to.include.keys('updatedAt');
    expect(response.dataValues).to.include.keys('createdAt');
    expect(response.dataValues).to.include.keys('favorited');
    expect(response.dataValues).to.include.keys('favoritesCount');
  });
});
