// eslint-disable-next-line import/no-extraneous-dependencies
import chai from 'chai';
// eslint-disable-next-line import/no-extraneous-dependencies
import chaiHttp from 'chai-http';
import { update } from '../../../queries/articles';
import * as Factory from '../../../helpers/factory';

const { expect } = chai;

const article = Factory.article.build();
delete article.id;
chai.use(chaiHttp);

// This is to test the query that is used to update data of a given article
describe('Query to edit an article', () => {
  it('should edit an article', async () => {
    const newArticle = await update(article, article.slug); // update article data
    expect(Object.keys(newArticle).length).to.be.above(0);
  });
});
