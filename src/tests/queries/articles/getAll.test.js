import chai from 'chai';
import chaiHttp from 'chai-http';
import { getAll } from '../../../queries/articles';
import * as Factory from '../../../helpers/factory';

const { expect } = chai;

const article = Factory.article.build();
delete article.id;
chai.use(chaiHttp);
describe('Query to get article', () => {
  it('should get all articles', async () => {
    const LIMIT = 2;
    const OFFSET = 0;
    const newArticle = await getAll(LIMIT, OFFSET); // getAll() parameters: limit and offset
    expect(Object.keys(newArticle).length).to.be.above(0);
  });
});
