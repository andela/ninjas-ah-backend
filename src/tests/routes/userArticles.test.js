import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../../app';
import status from '../../config/status';
import db from '../../models';
import * as Factory from '../../helpers/factory';

const { expect } = chai;
chai.should();
chai.use(chaiHttp);

let accessToken = '';
// fake article 1
const article1 = Factory.article.build();
// fake article 2
const article2 = Factory.article.build();
// fake user
const user = Factory.user.build();

let createdUser = '';
delete user.id;
user.email = 'wayde@haven.com';
user.username = 'wayde123';
describe('USER ARTICLES', () => {
  before(async () => {
    // create  a user
    // create a user
    createdUser = (await db.User.create(user, { logging: false })).dataValues;
    article1.userId = createdUser.id;
    article2.userId = createdUser.id;
    // generate token
    accessToken = jwt.sign(
      { id: createdUser.id, role: createdUser.role, permissions: createdUser.permissions },
      process.env.SECRET_KEY,
      { expiresIn: '1d' }
    );
  });
  describe('NO ARTICLES', () => {
    it('Should not get draft articles if a user does not have one', (done) => {
      chai
        .request(app)
        .get('/api/v1/profile/articles/drafts')
        .set('access-token', accessToken)
        .end((err, res) => {
          expect(res).to.have.status(status.NOT_FOUND);
          res.body.message.should.be.an('string');
          res.body.message.should.be.equal('No articles found');
          done();
        });
    });
    it('Should not get published articles if a user does not have one', (done) => {
      chai
        .request(app)
        .get('/api/v1/profile/articles/published')
        .set('access-token', accessToken)
        .end((err, res) => {
          expect(res).to.have.status(status.NOT_FOUND);
          res.body.message.should.be.an('string');
          res.body.message.should.be.equal('No articles found');
          done();
        });
    });
  });
  describe('ARTICLES', () => {
    let createdArticle2 = '';
    before(async () => {
      // create article 1
      delete article1.id;
      delete article1.readTime;
      article1.slug = 'baller-wayde-hasli23f1';
      article1.userId = createdUser.id;
      await db.Article.create(article1, { logging: false });
      // create article 2
      delete article1.id;
      delete article1.readTime;
      article2.slug = 'sometimes-i-see-magict-yaw42i2f1';
      article2.userId = createdUser.id;
      createdArticle2 = await db.Article.create(article2, { logging: false });
      // publish article 2
      await db.Article.update(
        { status: 'published' },
        { where: { slug: createdArticle2.dataValues.slug } }
      );
    });
    it('Should get draft articles', (done) => {
      chai
        .request(app)
        .get('/api/v1/profile/articles/drafts')
        .set('access-token', accessToken)
        .end((err, res) => {
          expect(res).to.have.status(status.OK);
          res.body.articles.should.be.a('array');
          res.body.articles[0].should.be.a('object');
          res.body.articles[0].id.should.be.a('number');
          res.body.articles[0].title.should.be.a('string');
          res.body.articles[0].body.should.be.a('string');
          res.body.articles[0].description.should.be.a('string');
          res.body.articles[0].slug.should.be.a('string');
          res.body.articles[0].coverUrl.should.be.a('string');
          done();
        });
    });
    it('Should get published articles', (done) => {
      chai
        .request(app)
        .get('/api/v1/profile/articles/published')
        .set('access-token', accessToken)
        .end((err, res) => {
          expect(res).to.have.status(status.OK);
          res.body.articles.should.be.a('array');
          res.body.articles[0].should.be.a('object');
          res.body.articles[0].id.should.be.a('number');
          res.body.articles[0].title.should.be.a('string');
          res.body.articles[0].body.should.be.a('string');
          res.body.articles[0].description.should.be.a('string');
          res.body.articles[0].slug.should.be.a('string');
          res.body.articles[0].coverUrl.should.be.a('string');
          done();
        });
    });
  });
});
