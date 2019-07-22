import chai from 'chai';
import chaiHttp from 'chai-http';
import * as Factory from '../../../helpers/factory';
import { Article } from '../../../queries';
import db from '../../../models';
import { filterQueryBuilder } from '../../../helpers/searchArticleFilters';

const { expect } = chai;

const article = Factory.article.build();
const user = Factory.user.build();
delete user.id;
delete article.id;
delete article.slug;
delete article.tagList;
chai.use(chaiHttp);
describe('Search query builder', () => {
  it('should test query builder', () => {
    const query = filterQueryBuilder();
    expect(Object.keys(query).length).to.be.above(0);
  });
  it('should test query builder with params', () => {
    const data = {
      author: 'John',
      tag: 'kigali',
      keyword: 'es6'
    };
    const query = filterQueryBuilder(data);
    expect(Object.keys(query).length).to.be.above(0);
  });
});
