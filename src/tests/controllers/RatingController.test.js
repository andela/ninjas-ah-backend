import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../../app';
import status from '../../config/status';
import db from '../../models';
import * as helpers from '../../helpers';
import * as Factory from '../../helpers/factory';

const { expect } = chai;
chai.should();
chai.use(chaiHttp);

let createdArticle = '';
let userId = 0;
let article = helpers.factory.article.build();
delete article.id;
delete article.tagList;
const RATING = 3;

let accessToken = '';
let createdUser = '';

const user = Factory.user.build();

delete user.id;
delete article.id;
user.email = 'rating@haven.com';
user.username = 'rating123';
describe('ARTICLE RATINGS', () => {
  before(async () => {
    createdUser = (await db.User.create(user, { logging: false })).dataValues;
    userId = createdUser.id;
    accessToken = jwt.sign(
      { id: createdUser.id, role: createdUser.role, permissions: createdUser.permissions },
      process.env.SECRET_KEY,
      { expiresIn: '1d' }
    );
    article = { ...article, userId, slug: helpers.generator.slug(article.slug) };
    createdArticle = await db.Article.create(article, { logging: false });

    return createdArticle;
  });
  it('should create rating', (done) => {
    const data = {
      rating: RATING
    };
    chai
      .request(app)
      .post(`/api/v1/rating/${createdArticle.dataValues.slug}/article`)
      .send(data)
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res).to.have.status(status.CREATED);
        res.body.should.be.an('object');
        res.body.rating.message.should.equal('Thank you for rating this article');
        done();
      });
  });
  it('should update rating', (done) => {
    const data = {
      rating: RATING
    };
    chai
      .request(app)
      .post(`/api/v1/rating/${createdArticle.dataValues.slug}/article`)
      .send(data)
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res).to.have.status(status.OK);
        res.body.should.be.an('object');
        res.body.rating.message.should.equal('Your article rating has been updated');
        done();
      });
  });
  it('should not create rating if it is greater than 5', (done) => {
    const data = {
      rating: 6
    };
    chai
      .request(app)
      .post(`/api/v1/rating/${createdArticle.dataValues.slug}/article`)
      .send(data)
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res).to.have.status(status.BAD_REQUEST);
        res.body.should.be.an('object');
        res.body.errors.rating.should.equal('rating must be between 1 and 5');
        done();
      });
  });
  it('should not create rating if it is less than 1', (done) => {
    const data = {
      rating: 0
    };
    chai
      .request(app)
      .post(`/api/v1/rating/${createdArticle.dataValues.slug}/article`)
      .send(data)
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res).to.have.status(status.BAD_REQUEST);
        res.body.should.be.an('object');
        res.body.errors.rating.should.equal('rating must be between 1 and 5');
        done();
      });
  });
  it('should not create rating if rating is not a number', (done) => {
    const data = {
      rating: 'one'
    };
    chai
      .request(app)
      .post(`/api/v1/rating/${createdArticle.dataValues.slug}/article`)
      .send(data)
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res).to.have.status(status.BAD_REQUEST);
        res.body.should.be.an('object');
        res.body.errors.rating.should.equal('rating must be a number');
        done();
      });
  });
  it("should get article's rating", (done) => {
    chai
      .request(app)
      .get(`/api/v1/rating/${createdArticle.dataValues.slug}/article`)
      .end((err, res) => {
        expect(res).to.have.status(status.OK);
        res.body.should.be.an('object');
        done();
      });
  });
  it('sort articles by rating', (done) => {
    chai
      .request(app)
      .get('/api/v1/rating/articles?limit=1&offset=0')
      .end((err, res) => {
        expect(res).to.have.status(status.OK);
        res.body.should.be.an('object');
        done();
      });
  });
  it("sort article's rating", (done) => {
    chai
      .request(app)
      .get(`/api/v1/rating/${createdArticle.dataValues.slug}/articles?limit=1&offset=0`)
      .end((err, res) => {
        expect(res).to.have.status(status.OK);
        res.body.should.be.an('object');
        done();
      });
  });
});
