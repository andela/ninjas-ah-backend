import chai from 'chai';
import chaiHttp from 'chai-http';
import { Article } from '../../../queries';
import db from '../../../models';
import * as Factory from '../../../helpers/factory';

chai.use(chaiHttp);

let createdUser = '';
let createdArticle = '';

const user = Factory.user.build();
const article = Factory.article.build();

delete user.id;
delete article.id;
// This is to test the query that is used to update data of a given article
describe('Query to edit an article', () => {
  before(async () => {
    try {
      await db.User.destroy({
        truncate: true,
        cascade: true,
        logging: false
      });
      createdUser = (await db.User.create(user, { logging: false })).dataValues;
      article.userId = createdUser.id;
      createdArticle = (await db.Article.create(article, { logging: false })).dataValues;
    } catch (error) {
      throw error;
    }
  });
  it('should edit an article', async () => {
    const response = await Article.update(
      {
        title: 'aaaaavfff yyyy'
      },
      createdArticle.slug
    );
    response.should.be.an('object');
    Object.keys(response).length.should.above(0);
  });
  it('should fail to edit article', async () => {
    // find article to update
    const response = await Article.update();
    response.should.be.an('object');
    Object.keys(response).length.should.equal(0);
  });
});
