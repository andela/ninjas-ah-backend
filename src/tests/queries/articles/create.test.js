// eslint-disable-next-line import/no-extraneous-dependencies
import chai from 'chai';
// eslint-disable-next-line import/no-extraneous-dependencies
import chaiHttp from 'chai-http';
import { create } from '../../../queries/articles';
import * as Factory from '../../../helpers/factory';

const { expect } = chai;

const article = Factory.article.build();
delete article.id;
chai.use(chaiHttp);
describe('Tag query', () => {
  it('should test that create tags', async () => {
    const newArticle = await create(article);
    expect(Object.keys(newArticle).length).to.be.above(0);
  });
});
