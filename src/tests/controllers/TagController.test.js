// eslint-disable-next-line import/no-extraneous-dependencies
import chai from 'chai';
// eslint-disable-next-line import/no-extraneous-dependencies
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../../app';
import status from '../../config/status';
import db from '../../models';
import * as Factory from '../../helpers/factory';

const { expect } = chai;
chai.should();

const article = Factory.article.build();
const user = Factory.user.build();
chai.use(chaiHttp);
let accessToken = '';
let createdUser = '';
delete user.id;
user.email = 'rosie@haven.com';
user.username = 'rosie123';
describe('TAGS', () => {
  let response = '';
  before(async () => {
    createdUser = (await db.User.create(user, { logging: false })).dataValues;
    article.userId = createdUser.id;
    accessToken = jwt.sign(
      { id: createdUser.id, role: createdUser.role, permissions: createdUser.permissions },
      process.env.SECRET_KEY,
      { expiresIn: '1d' }
    );
    delete article.id;
    delete article.readTime;
    article.slug = 'lorem-ipsum-foo-hasli234rhjav';
    article.userId = createdUser.id;
    response = await db.Article.create(article, { logging: false });
  });
  it('should create a tag', (done) => {
    chai
      .request(app)
      .put(`/api/v1/articles/${response.dataValues.slug}/tags`)
      .send({ tagList: ['Holla'] })
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res).to.have.status(status.CREATED);
        res.body.should.be.an('object');
        res.body.response.should.equal('Tag list has been updated');
        done();
      });
  });
  it('should not create tags if they are more than 5', (done) => {
    chai
      .request(app)
      .put(`/api/v1/articles/${response.dataValues.slug}/tags`)
      .send({ tagList: ['Morning', 'Bonjour', 'Bonjourno', 'Dias', 'Hakuna Matata', 'Energy'] })
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res).to.have.status(status.BAD_REQUEST);
        res.body.should.be.an('object');
        res.body.errors[0].should.equal('tagList must contain less than or equal to 5 items');
        done();
      });
  });
  it('should delete a tag', (done) => {
    chai
      .request(app)
      .delete(`/api/v1/articles/${response.dataValues.slug}/tags`)
      .send({ tagList: ['Holla'] })
      .set('access-token', accessToken)
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
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res).to.have.status(status.OK);
        res.body.should.be.an('object');
        res.body.tags.should.be.an('array');
        done();
      });
  });
  it('should not create tags if it is a string', (done) => {
    const tagList = 'text';
    chai
      .request(app)
      .put(`/api/v1/articles/${response.dataValues.slug}/tags`)
      .send({ tagList })
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res).to.have.status(status.BAD_REQUEST);
        res.body.should.be.an('object');
        res.body.errors[0].should.equal('tagList must be an array');
        done();
      });
  });
  it('should not create tags if tagList is not provided', (done) => {
    chai
      .request(app)
      .put(`/api/v1/articles/${response.dataValues.slug}/tags`)
      .send()
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res).to.have.status(status.BAD_REQUEST);
        res.body.should.be.an('object');
        res.body.errors[0].should.equal('tagList is required');
        done();
      });
  });
});
