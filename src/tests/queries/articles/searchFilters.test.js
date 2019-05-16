// eslint-disable-next-line import/no-extraneous-dependencies
import chai from 'chai';
// eslint-disable-next-line import/no-extraneous-dependencies
import chaiHttp from 'chai-http';
import * as Factory from '../../../helpers/factory';
import { Article } from '../../../queries';
import db from '../../../models';

const { expect } = chai;

const article = Factory.article.build();
delete article.id;
chai.use(chaiHttp);
describe('Query to get article by tag', () => {
  let currentArticle = '';
  before(async () => {
    currentArticle = await db.Article.findAll({
      limit: 1,
      logging: false,
      include: [
        {
          model: db.User,
          as: 'author',
          attributes: ['username', 'bio', 'image']
        }
      ]
    });
    currentArticle = currentArticle[0].dataValues;
  });
  it('should get articles by tags', async () => {
    const tag = article.tagList[0];
    const keyword = null;
    const author = null;
    const LIMIT = 20;
    const OFFSET = 0;
    const response = await Article.getAll(LIMIT, OFFSET, keyword, author, tag);
    expect(Object.keys(response).length).to.be.above(0);
    expect(response[0]).to.include.keys('dataValues');
  });
  it('should get articles by keyword', async () => {
    const tag = null;
    const keyword = currentArticle.title.split(' ', 1);
    const author = null;
    const LIMIT = 20;
    const OFFSET = 0;
    const response = await Article.getAll(LIMIT, OFFSET, keyword, author, tag);
    expect(Object.keys(response).length).to.be.above(0);
    expect(response[0]).to.include.keys('dataValues');
  });
  it('should get articles by author', async () => {
    const tag = null;
    const keyword = null;
    const author = currentArticle.author.dataValues.username;
    const LIMIT = 20;
    const OFFSET = 0;
    const response = await Article.getAll(LIMIT, OFFSET, keyword, author, tag);
    expect(Object.keys(response).length).to.be.above(0);
    expect(response[0]).to.include.keys('dataValues');
  });
  it('should get articles by keyword and author', async () => {
    const tag = null;
    const keyword = currentArticle.title.split(' ', 1);
    const author = currentArticle.author.dataValues.username;
    const LIMIT = 20;
    const OFFSET = 0;
    const response = await Article.getAll(LIMIT, OFFSET, keyword, author, tag);
    expect(Object.keys(response).length).to.be.above(0);
    expect(response[0]).to.include.keys('dataValues');
  });
  it('should get articles by keyword and tag', async () => {
    const tag = article.tagList[0];
    const keyword = currentArticle.title.split(' ', 1);
    const author = null;
    const LIMIT = 20;
    const OFFSET = 0;
    const response = await Article.getAll(LIMIT, OFFSET, keyword, author, tag);
    expect(Object.keys(response).length).to.be.above(0);
    expect(response[0]).to.include.keys('dataValues');
  });
  it('should get articles by author and tag', async () => {
    const tag = article.tagList[0];
    const keyword = null;
    const author = currentArticle.author.dataValues.username;
    const LIMIT = 20;
    const OFFSET = 0;
    const response = await Article.getAll(LIMIT, OFFSET, keyword, author, tag);
    expect(Object.keys(response).length).to.be.above(0);
    expect(response[0]).to.include.keys('dataValues');
  });
  it('should get articles by author, keyword and tag', async () => {
    const tag = article.tagList[0];
    const keyword = currentArticle.title.split(' ', 1);
    const author = currentArticle.author.dataValues.username;
    const LIMIT = 20;
    const OFFSET = 0;
    const response = await Article.getAll(LIMIT, OFFSET, keyword, author, tag);
    expect(Object.keys(response).length).to.be.above(0);
    expect(response[0]).to.include.keys('dataValues');
  });
});
