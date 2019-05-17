// eslint-disable-next-line import/no-extraneous-dependencies
import chai from 'chai';
// eslint-disable-next-line import/no-extraneous-dependencies
import chaiHttp from 'chai-http';
import { Tag, Article } from '../../../queries';
import * as Factory from '../../../helpers/factory';
import db from '../../../models';

const article = Factory.article.build();
delete article.id;
const tagList = ['Morning', 'Bonjour', 'Bonjourno', 'Dias', 'Hakuna Matata'];
chai.use(chaiHttp);
describe('Tag query', () => {
  let fetchArticle;
  before(async () => {
    fetchArticle = await db.Article.findAll({ limit: 1, logging: false });
    return fetchArticle;
  });
  it('should update tag', async () => {
    const action = 'update';
    const findArticle = await db.Article.findAll({ limit: 1, logging: false });
    const response = await Tag.update(article.tagList, findArticle[0].dataValues.slug, action);
    response.should.be.an('string');
    response.should.equal('Tag list has been updated');
  });
  it('should not create tags if they are more than 5', async () => {
    const action = 'update';
    const { slug } = fetchArticle[0].dataValues;
    const updateTags = await Tag.update(tagList, slug, action);
    updateTags.should.be.an('string');
  });
});
