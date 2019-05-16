// eslint-disable-next-line import/no-extraneous-dependencies
import chai from 'chai';
// eslint-disable-next-line import/no-extraneous-dependencies
import chaiHttp from 'chai-http';
import { Tag } from '../../../queries';
import * as Factory from '../../../helpers/factory';
import db from '../../../models';

const article = Factory.article.build();
delete article.id;
chai.use(chaiHttp);
describe('Tag query', () => {
  it('should update tag', async () => {
    const action = 'update';
    const findArticle = await db.Article.findAll({ limit: 1, logging: false });
    const response = await Tag.update(article.tagList, findArticle[0].dataValues.slug, action);
    response.should.be.an('string');
    response.should.equal('Tag list has been updated');
  });
});
