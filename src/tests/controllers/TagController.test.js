// eslint-disable-next-line import/no-extraneous-dependencies
import chai from 'chai';
// eslint-disable-next-line import/no-extraneous-dependencies
import chaiHttp from 'chai-http';
import app from '../../app';
import status from '../../config/status';
import db from '../../models';
import * as Factory from '../../helpers/factory';

const { expect } = chai;
chai.should();

const article = Factory.article.build();
chai.use(chaiHttp);
const token = 'token-string';
describe('TAGS', () => {
  let response = '';
  before(async () => {
    const findUser = await db.User.findAll({ limit: 1, logging: false });
    delete article.id;
    delete article.readTime;
    article.slug = 'lorem-ipsum-foo-hasli234rhjav';
    article.userId = findUser[0].dataValues.id;
    response = await db.Article.create(article, { logging: false });
  });
  it('should create a tag', (done) => {
    chai
      .request(app)
      .put(`/api/v1/articles/${response.dataValues.slug}/tags`)
      .send({ tagList: ['Holla'] })
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(status.CREATED);
        res.body.should.be.an('object');
        res.body.response.should.equal('Tag list has been updated');
        done();
      });
  });
  it('should not create tags if there are more than 5', (done) => {
    chai
      .request(app)
      .put(`/api/v1/articles/${response.dataValues.slug}/tags`)
      .send({ tagList: ['Morning', 'Bonjour', 'Bonjourno', 'Dias'] })
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(status.CREATED);
        res.body.should.be.an('object');
        res.body.response.should.equal('You can not create more than 5 tags per article');
        done();
      });
  });
  it('should delete a tag', (done) => {
    chai
      .request(app)
      .delete(`/api/v1/articles/${response.dataValues.slug}/tags`)
      .send({ tagList: ['Holla'] })
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(status.OK);
        res.body.should.be.an('object');
        res.body.response.should.equal('Tag has been deleted');
        done();
      });
  });
  it('should get a list of all tags', (done) => {
    chai
      .request(app)
      .get('/api/v1/tags')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(status.OK);
        res.body.should.be.an('object');
        res.body.tags.should.be.an('array');
        done();
      });
  });
  it('should not create tags if it is a string', (done) => {
    chai
      .request(app)
      .put(`/api/v1/articles/${response.dataValues.slug}/tags`)
      .send({ tagList: 'text' })
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(status.BAD_REQUEST);
        res.body.should.be.an('object');
        res.body.errors[0].should.equal('tagList must be an array');
        done();
      });
  });
});
