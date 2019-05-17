// eslint-disable-next-line import/no-extraneous-dependencies
import chai from 'chai';
// eslint-disable-next-line import/no-extraneous-dependencies
import chaiHttp from 'chai-http';
import { get } from '../../../queries/articles';
import * as Factory from '../../../helpers/factory';

const { expect } = chai;

const article = Factory.article.build();
delete article.id;
chai.use(chaiHttp);
describe('Query to get tags', () => {
  it('should get one article', async () => {
    console.log('matata');
    // const newArticle = await get({ slug: article.slug });
    // expect(Object.keys(newArticle).length).to.be.above(0);
  });
});
