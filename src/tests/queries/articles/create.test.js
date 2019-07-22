import chai from 'chai';
import chaiHttp from 'chai-http';
import { Article, User } from '../../../queries';
import * as Factory from '../../../helpers/factory';
import * as helpers from '../../../helpers';

const { expect } = chai;

const article = Factory.article.build();
const user = Factory.user.build();

chai.use(chaiHttp);
describe('Query to create article', () => {
  it('should create aricle', async () => {
    const newUser = await User.create(user);
    article.userId = newUser.id;
    article.status = 'published';
    article.slug = helpers.generator.slug(article.title);
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
