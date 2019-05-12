// eslint-disable-next-line import/no-extraneous-dependencies
import chai from 'chai';
// eslint-disable-next-line import/no-extraneous-dependencies
import chaiHttp from 'chai-http';
import { Article } from '../../../queries';
import * as Factory from '../../../helpers/factory';
import generateSlug from '../../../helpers/generateSlug';
import db from '../../../models';

const { expect } = chai;

const article = Factory.article.build();

chai.use(chaiHttp);
describe('Query to create article', () => {
  it('should create aricle', async () => {
    delete article.id;
    const findUser = await db.User.findAll({ limit: 1, logging: false });
    article.userId = findUser[0].dataValues.id;
    article.slug = generateSlug(article.title);
    const response = await Article.create(article);
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
