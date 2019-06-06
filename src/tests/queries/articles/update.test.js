import chai from 'chai';
import chaiHttp from 'chai-http';
import { Article } from '../../../queries';
import db from '../../../models';

chai.use(chaiHttp);
// This is to test the query that is used to update data of a given article
describe('Query to edit an article', () => {
  it('should edit an article', async () => {
    // find article to update
    const findArticle = await db.Article.findAll({ limit: 1, logging: false });
    const {
      title,
      body,
      description,
      readTime,
      coverUrl,
      slug,
      userId
    } = findArticle[0].dataValues;
    const response = await Article.update(
      {
        userId,
        title,
        body,
        description,
        readTime,
        coverUrl
      },
      slug
    );
    response.should.be.an('array');
    response[1].should.be.an('array');
  });
  it('should fail to edit article', async () => {
    // find article to update
    const response = await Article.update();
    response.should.be.an('array');
    response[0].should.equal(0);
  });
});
