// eslint-disable-next-line import/no-extraneous-dependencies
import chai from 'chai';
// eslint-disable-next-line import/no-extraneous-dependencies
import chaiHttp from 'chai-http';
import { Article } from '../../../queries';
import * as Factory from '../../../helpers/factory';
import db from '../../../models';

const { expect } = chai;

const article = Factory.article.build();
delete article.id;
chai.use(chaiHttp);
describe('Query to get article', () => {
  it('should get one article', async () => {
    const findArticle = await db.Article.findAll({ limit: 1, logging: false });
    const { slug } = findArticle[0].dataValues;
    const response = await Article.get({ slug });
    expect(Object.keys(response).length).to.be.above(0);
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
  it('should get article', async () => {
    const response = await Article.get();
    expect(Object.keys(response).length).to.be.above(0);
  });
});
