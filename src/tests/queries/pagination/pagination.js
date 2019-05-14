// eslint-disable-next-line import/no-extraneous-dependencies
import chai from 'chai';
// eslint-disable-next-line import/no-extraneous-dependencies
import chaiHttp from 'chai-http';
import { getAll } from '../../../queries/articles';

const { expect } = chai;

chai.use(chaiHttp);
describe('Pagination query', () => {
  it('should get article by pages', async () => {
    const newArticle = await getAll(2, 0); // getAll() parameters: limit and offset
    expect(Object.keys(newArticle).length).to.be.above(0);
  });
});
