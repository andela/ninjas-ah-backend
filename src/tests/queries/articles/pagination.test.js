// eslint-disable-next-line import/no-extraneous-dependencies
import chai from 'chai';
// eslint-disable-next-line import/no-extraneous-dependencies
import chaiHttp from 'chai-http';
import { getAll } from '../../../queries/articles';

const { expect } = chai;

chai.use(chaiHttp);
describe('Pagination query', async () => {
  it('should get article by pages', async () => {
    const LIMIT = 1;
    const OFFSET = 0;
    const newArticle = getAll(LIMIT, OFFSET); // getAll() parameters: limit and offset
    expect(Object.keys(newArticle).length).to.be.equal(0);
  });
});
