import chai from 'chai';
import chaiHttp from 'chai-http';
import * as Factory from '../../../helpers/factory';
import { Article } from '../../../queries';
import db from '../../../models';

const { expect } = chai;

const article = Factory.article.build();
delete article.id;
chai.use(chaiHttp);
describe('Query to get article by filters', () => {
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
    const condition = {
      keyword: undefined,
      author: undefined,
      tag: currentArticle.tagList[0]
    };
    const LIMIT = 20;
    const OFFSET = 0;
    const response = await Article.getAll(LIMIT, OFFSET, condition);
    expect(Object.keys(response).length).to.be.above(0);
    expect(response[0]).to.include.keys('dataValues');
  });
  it('should get articles by keyword', async () => {
    const condition = {
      keyword: currentArticle.title.split(' ', 1),
      author: undefined,
      tag: undefined
    };
    const LIMIT = 20;
    const OFFSET = 0;
    const response = await Article.getAll(LIMIT, OFFSET, condition);
    expect(Object.keys(response).length).to.be.above(0);

    expect(response[0]).to.include.keys('dataValues');
  });
  it('should get articles by author filter', async () => {
    const condition = {
      keyword: undefined,
      author: currentArticle.author.dataValues.username,
      tag: undefined
    };
    const LIMIT = 20;
    const OFFSET = 0;
    const response = await Article.getAll(LIMIT, OFFSET, condition);
    expect(Object.keys(response).length).to.be.above(0);
    expect(response[0]).to.include.keys('dataValues');
  });
  it('should get articles by keyword and author', async () => {
    const condition = {
      keyword: currentArticle.title.split(' ', 1),
      author: currentArticle.author.dataValues.username,
      tag: undefined
    };
    const LIMIT = 20;
    const OFFSET = 0;
    const response = await Article.getAll(LIMIT, OFFSET, condition);
    expect(Object.keys(response).length).to.be.above(0);
    expect(response[0]).to.include.keys('dataValues');
  });
  it('should get articles by keyword and tag', async () => {
    const condition = {
      keyword: currentArticle.title.split(' ', 1),
      author: undefined,
      tag: article.tagList[0]
    };
    const LIMIT = 20;
    const OFFSET = 0;
    const response = await Article.getAll(LIMIT, OFFSET, condition);
    expect(Object.keys(response).length).to.be.above(0);
    expect(response[0]).to.include.keys('dataValues');
  });
  it('should get articles by author and tag', async () => {
    const condition = {
      keyword: undefined,
      author: currentArticle.author.dataValues.username,
      tag: article.tagList[0]
    };
    const LIMIT = 20;
    const OFFSET = 0;
    const response = await Article.getAll(LIMIT, OFFSET, condition);
    expect(Object.keys(response).length).to.be.above(0);
    expect(response[0]).to.include.keys('dataValues');
  });
  it('should get articles by author, keyword and tag', async () => {
    const condition = {
      tag: article.tagList[0],
      keyword: currentArticle.title.split(' ', 1),
      author: currentArticle.author.dataValues.username
    };
    const LIMIT = 20;
    const OFFSET = 0;
    const response = await Article.getAll(LIMIT, OFFSET, condition);
    expect(Object.keys(response).length).to.be.above(0);
    expect(response[0]).to.include.keys('dataValues');
  });
});
