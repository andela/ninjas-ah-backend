import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../../app';
import status from '../../config/status';
import db from '../../models';
import * as Factory from '../../helpers/factory';

const { expect } = chai;
chai.should();

const article = Factory.article.build();
chai.use(chaiHttp);

let accessToken = '';
let createdUser = '';

const user = Factory.user.build();

delete user.id;
delete article.id;
let author = 0;
describe('No articles', () => {
  before(async () => {
    createdUser = (await db.User.create(user, { logging: false })).dataValues;
    article.userId = createdUser.id;
    author = createdUser.id;
    accessToken = jwt.sign(
      { id: createdUser.id, role: createdUser.role, permissions: createdUser.permissions },
      process.env.SECRET_KEY,
      { expiresIn: '1d' }
    );
    await db.Article.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
      logging: false
    });
  });

  describe('Test not-found articles', () => {
    after(async () => {
      // const findUser = await db.User.findAll({ limit: 1, logging: false });
      // author = findUser[0].dataValues.id;
      const initalArticle = article;
      delete initalArticle.id;
      initalArticle.userId = author;
      delete initalArticle.readTime;
      await db.Article.create(initalArticle, { logging: false });
    });
    it('Should test slug validator and reject request if slug characters are minimum to 10', (done) => {
      chai
        .request(app)
        .put('/api/v1/articles/foo/publish')
        .set('access-token', accessToken)
        .end((err, res) => {
          expect(res).to.have.status(status.BAD_REQUEST);
          res.body.should.be.an('object');
          res.body.errors.should.be.an('array');
          done();
        });
    });
    it('Should not get articles if article table is empty', (done) => {
      chai
        .request(app)
        .get('/api/v1/articles')
        .set('access-token', accessToken)
        .end((err, res) => {
          expect(res).to.have.status(status.NOT_FOUND);
          res.body.should.be.an('object');
          res.body.message.should.equal('No articles found');
          done();
        });
    });
    it('Should not get articles if table is empty', (done) => {
      chai
        .request(app)
        .get(`/api/v1/articles/${article.slug}`)
        .set('access-token', accessToken)
        .end((err, res) => {
          expect(res).to.have.status(status.NOT_FOUND);
          res.body.should.be.an('object');
          res.body.error.should.equal('No article found');
          done();
        });
    });

    it('Should not update if author does not exist', (done) => {
      delete article.id;
      const fakeArticle1 = { ...article, slug: 'fake-easy-opojvbldff' };
      delete fakeArticle1.userId;

      chai
        .request(app)
        .put('/api/v1/articles/invalid-bad-pkljvbm1e9o')
        .set('access-token', accessToken)
        .send(fakeArticle1)
        .end((err, res) => {
          expect(res).to.have.status(status.BAD_REQUEST);
          res.body.should.be.an('object');
          res.body.errors.should.be.an('array');
          done();
        });
    });
    it('Should not update if slug article is not valid', (done) => {
      delete article.id;
      const fakeArticle1 = { ...article, slug: 'fake-easy-opojvbldff' };
      delete fakeArticle1.userId;

      chai
        .request(app)
        .put('/api/v1/articles/invalid-bad-pkljvbm1e9o')
        .set('access-token', accessToken)
        .send(fakeArticle1)
        .end((err, res) => {
          expect(res).to.have.status(status.BAD_REQUEST);
          res.body.should.be.an('object');
          res.body.errors.should.be.an('array');
          done();
        });
    });
    it('Should not unpublish a non-existing article', (done) => {
      chai
        .request(app)
        .put('/api/v1/articles/invali-6jv9cn4szf/unpublish')
        .set('access-token', accessToken)
        .end((err, res) => {
          expect(res).to.have.status(status.NOT_FOUND);
          res.body.should.be.a('object');
          res.body.error.should.equal('No article found');
          done();
        });
    });
    it('Should not publish a non-existing article', (done) => {
      chai
        .request(app)
        .put('/api/v1/articles/invalid-1632jv5quc9c/publish')
        .set('access-token', accessToken)
        .end((err, res) => {
          expect(res).to.have.status(status.NOT_FOUND);
          res.body.should.be.a('object');
          res.body.error.should.equal('No article found');
          done();
        });
    });
  });
});

describe('Article', () => {
  let articleSlug = '';
  before(async () => {
    // const findUser = await db.User.findAll({ limit: 1, logging: false });
    // author = findUser[0].dataValues.id;
    const { dataValues } = await db.Article.findOne({ where: { id: 1 } }, { logging: false });
    articleSlug = dataValues.slug;
    // create gallery
    await db.Gallery.create({ image: 'placeholder.png', userId: author });
  });
  //   // create article
  it('Should successfully create an article', (done) => {
    delete article.id;
    delete article.slug;
    delete article.readTime;
    chai
      .request(app)
      .post('/api/v1/articles')
      .set('access-token', accessToken)
      .send(article)
      .end((err, res) => {
        const response = res.body;
        expect(res).to.have.status(status.CREATED);
        response.article.status.should.be.a('string');
        response.article.title.should.be.a('string');
        response.article.body.should.be.a('string');
        response.article.slug.should.be.a('string');
        expect(response.article.userId).should.be.an('object');
        done();
      });
  });

  it('Should update article cover', async () => {
    // const myArticle = await db.Article.findOne({ where: { userId: createdUser.id } });
    chai
      .request(app)
      .post(`/api/v1/articles/${articleSlug}/cover`)
      .set('access-token', accessToken)
      .send({ coverUrl: 'placeholder.png' })
      .end((err, res) => {
        expect(res).to.have.status(status.OK);
        res.body.should.be.an('object');
        expect(res.body.coverUrl).to.equal('CoverUrl has been updated');
      });
  });
  it('Should not update article cover if image not provided ', async () => {
    chai
      .request(app)
      .post('/api/v1/articles/rosie-make-it-easy-1dh6jv9cn4sz/cover')
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res).to.have.status(status.BAD_REQUEST);
        res.body.should.be.an('object');
        expect(res.body.errors.coverUrl).to.equal('coverUrl not updated, try again');
      });
  });
  it('Should get gallery', async () => {
    chai
      .request(app)
      .get('/api/v1/gallery')
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res).to.have.status(status.OK);
        res.body.should.be.an('object');
      });
  });
  it('Should successfully create an article even if title is more than 70 characters', (done) => {
    delete article.id;
    delete article.userId;
    delete article.slug;
    delete article.readTime;
    const bigArticleTitle = {
      ...article,
      title:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas viverra massa eget turpis finibus dictum'
    };
    chai
      .request(app)
      .post('/api/v1/articles')
      .send(bigArticleTitle)
      .set('access-token', accessToken)
      .end((err, res) => {
        const response = res.body;
        expect(res).to.have.status(status.CREATED);
        response.article.status.should.be.a('string');
        response.article.title.should.be.a('string');
        response.article.body.should.be.a('string');
        response.article.slug.should.be.a('string');
        expect(response.article.userId).should.be.an('object');
        done();
      });
  });
  it('Should not create article if title is empty', (done) => {
    delete article.id;
    delete article.slug;
    delete article.readTime;
    article.title = '';
    chai
      .request(app)
      .post('/api/v1/articles')
      .send(article)
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res).to.have.status(status.BAD_REQUEST);
        res.body.errors.should.be.a('array');
        done();
      });
  });
  it('Title should be between 5 to 256 characters', (done) => {
    delete article.id;
    delete article.slug;
    delete article.userId;
    delete article.readTime;
    article.title = 'Hey';
    chai
      .request(app)
      .post('/api/v1/articles')
      .send(article)
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res).to.have.status(status.BAD_REQUEST);
        res.body.errors.should.be.a('array');
        done();
      });
  });
  it('Should trim empty space before the first letter of the title and after the last letter of the title', (done) => {
    delete article.id;
    delete article.slug;
    delete article.readTime;
    article.title = ' Rosie, make it easy ';
    const fakeArticle2 = { ...article, userId: author };
    chai
      .request(app)
      .post('/api/v1/articles')
      .send(fakeArticle2)
      .set('access-token', accessToken)
      .end((err, res) => {
        const response = res.body;
        expect(res).to.have.status(status.CREATED);
        response.article.status.should.be.a('string');
        response.article.title.should.be.a('string');
        response.article.body.should.be.a('string');
        response.article.slug.should.be.a('string');
        expect(response.article.userId).should.be.an('object');
        done();
      });
  });
  it('Should not create article if body is empty', (done) => {
    delete article.id;
    delete article.slug;
    delete article.readTime;
    article.body = '';
    chai
      .request(app)
      .post('/api/v1/articles')
      .set(article)
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res).to.have.status(400);
        res.body.errors.should.be.a('array');
        done();
      });
  });
  it('Should not create the article if the content is less than 5 characters', (done) => {
    delete article.id;
    delete article.slug;
    delete article.userId;
    delete article.readTime;
    article.body = 'Hey';
    chai
      .request(app)
      .post('/api/v1/articles')
      .send(article)
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res).to.have.status(status.BAD_REQUEST);
        res.body.errors.should.be.a('array');
        done();
      });
  });
  it('Should trim empty spaces before the content of the article and after the last letter of the content', (done) => {
    delete article.id;
    delete article.slug;
    delete article.readTime;
    article.body = ' More about this the dance of chicken ';
    const fakeArticle3 = { ...article, userId: author };
    chai
      .request(app)
      .post('/api/v1/articles')
      .set('access-token', accessToken)
      .send(fakeArticle3)
      .end((err, res) => {
        const response = res.body;
        expect(res).to.have.status(status.CREATED);
        response.article.status.should.be.a('string');
        response.article.title.should.be.a('string');
        response.article.body.should.be.a('string');
        response.article.slug.should.be.a('string');
        expect(response.article.userId).should.be.an('object');
        done();
      });
  });
  it('Should get all articles', (done) => {
    chai
      .request(app)
      .get('/api/v1/articles')
      .set('access-token', accessToken)
      .end((err, res) => {
        const response = res.body;
        expect(res).to.have.status(status.OK);
        response.articles.should.be.a('array');
        response.articles[0].should.be.a('object');
        response.articles[0].id.should.be.a('number');
        response.articles[0].title.should.be.a('string');
        response.articles[0].body.should.be.a('string');
        response.articles[0].description.should.be.a('string');
        response.articles[0].slug.should.be.a('string');
        done();
      });
  });
  it('Should get all articles', (done) => {
    chai
      .request(app)
      .get('/api/v1/articles/drafts')
      .set('access-token', accessToken)
      .end((err, res) => {
        const response = res.body;
        expect(res).to.have.status(status.OK);
        response.articles.should.be.a('array');
        response.articles[0].should.be.a('object');
        response.articles[0].id.should.be.a('number');
        response.articles[0].title.should.be.a('string');
        response.articles[0].body.should.be.a('string');
        response.articles[0].description.should.be.a('string');
        response.articles[0].slug.should.be.a('string');
        done();
      });
  });
  it('Should get articles by pagination', (done) => {
    const LIMIT = 1;
    const OFFSET = 0;
    chai
      .request(app)
      .get(`/api/v1/articles?limit=${LIMIT}&offset=${OFFSET}`)
      .set('access-token', accessToken)
      .end((err, res) => {
        const response = res.body;
        expect(res).to.have.status(status.OK);
        response.articles.should.be.a('array');
        response.articles[0].should.be.a('object');
        response.articles[0].id.should.be.a('number');
        response.articles[0].title.should.be.a('string');
        response.articles[0].body.should.be.a('string');
        response.articles[0].description.should.be.a('string');
        response.articles[0].slug.should.be.a('string');
        done();
      });
  });
  it('Should throw error if limit is a string', (done) => {
    const LIMIT = 'text';
    const OFFSET = 0;
    chai
      .request(app)
      .get(`/api/v1/articles?limit=${LIMIT}&offset=${OFFSET}`)
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res).to.have.status(status.BAD_REQUEST);
        res.body.errors.should.be.an('array');
        res.body.errors[0].should.equal('limit must be a number');
        done();
      });
  });
  it('Should throw error if tag filter is called more than once', (done) => {
    const TAG = 'text';
    chai
      .request(app)
      .get(`/api/v1/articles?tag=${TAG}&tag=${TAG}`)
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res).to.have.status(status.BAD_REQUEST);
        res.body.errors.should.be.an('object');
        res.body.errors.tag.should.be.a('string');
        res.body.errors.tag.should.equal('tag can not be declared more than once');
        done();
      });
  });
  it('Should throw error if keyword filter is called more than once', (done) => {
    const KEYWORD = 'text';
    chai
      .request(app)
      .get(`/api/v1/articles?keyword=${KEYWORD}&keyword=${KEYWORD}`)
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res).to.have.status(status.BAD_REQUEST);
        res.body.errors.should.be.an('object');
        res.body.errors.keyword.should.be.a('string');
        res.body.errors.keyword.should.equal('keyword can not be declared more than once');
        done();
      });
  });
  it('Should throw error if author filter is called more than once', (done) => {
    const AUTHOR = 'text';
    chai
      .request(app)
      .get(`/api/v1/articles?author=${AUTHOR}&author=${AUTHOR}`)
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res).to.have.status(status.BAD_REQUEST);
        res.body.errors.should.be.an('object');
        res.body.errors.author.should.be.a('string');
        res.body.errors.author.should.equal('author can not be declared more than once');
        done();
      });
  });
  it('Should throw error if offset is a string', (done) => {
    const LIMIT = 1;
    const OFFSET = 'text';
    chai
      .request(app)
      .get(`/api/v1/articles?limit=${LIMIT}&offset=${OFFSET}`)
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res).to.have.status(status.BAD_REQUEST);
        res.body.errors.should.be.an('array');
        res.body.errors[0].should.equal('offset must be a number');
        done();
      });
  });
  it('Should throw error if offset number is less than 0', (done) => {
    const LIMIT = 1;
    const OFFSET = -3;
    chai
      .request(app)
      .get(`/api/v1/articles?limit=${LIMIT}&offset=${OFFSET}`)
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res).to.have.status(status.BAD_REQUEST);
        res.body.errors.should.be.a('array');
        res.body.errors[0].should.equal('offset must be larger than or equal to 0');
        done();
      });
  });
  it('should throw error if limit is declared 2 times', (done) => {
    const LIMIT = 1;
    chai
      .request(app)
      .get(`/api/v1/articles?limit=${LIMIT}&limit=${LIMIT}`)
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res).to.have.status(status.BAD_REQUEST);
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('limit');
        res.body.errors.limit.should.equal('limit can not be declared more than once');
        done();
      });
  });
  it('should throw error if offset is declared 2 times', (done) => {
    const OFFSET = 1;
    chai
      .request(app)
      .get(`/api/v1/articles?offset=${OFFSET}&offset=${OFFSET}`)
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res).to.have.status(status.BAD_REQUEST);
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('offset');
        res.body.errors.offset.should.equal('offset can not be declared more than once');
        done();
      });
  });
  it('Should throw error if limit number is less than 1', (done) => {
    const LIMIT = 0;
    const OFFSET = 0;
    chai
      .request(app)
      .get(`/api/v1/articles?limit=${LIMIT}&offset=${OFFSET}`)
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res).to.have.status(status.BAD_REQUEST);
        res.body.errors.should.be.a('array');
        res.body.errors[0].should.equal('limit must be larger than or equal to 1');
        done();
      });
  });
  it('Should get one article', (done) => {
    // const getArticle = { ...article, slug: 'rosie-make-it-easy-1dh6jv9cn4sz' };
    chai
      .request(app)
      .get(`/api/v1/articles/${articleSlug}`)
      .set('access-token', accessToken)
      .end((err, res) => {
        const response = res.body;
        expect(res).to.have.status(status.OK);
        response.article.should.be.a('object');
        response.article.id.should.be.a('number');
        response.article.title.should.be.a('string');
        response.article.body.should.be.a('string');
        response.article.description.should.be.a('string');
        response.article.slug.should.be.a('string');
        response.article.coverUrl.should.be.a('string');
        done();
      });
  });
  it('Should update the article', (done) => {
    delete article.id;
    const updateArticle = { ...article };
    delete updateArticle.slug;
    delete updateArticle.tagList;
    delete updateArticle.readTime;
    chai
      .request(app)
      .put(`/api/v1/articles/${articleSlug}`)
      .send(updateArticle)
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res).to.have.status(status.OK);
        res.body.should.be.an('object');
        res.body.message.should.equal('Article has been updated');
        done();
      });
  });
  it('Should publish an article', (done) => {
    chai
      .request(app)
      .put(`/api/v1/articles/${articleSlug}/publish`)
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res).to.have.status(status.OK);
        res.body.should.be.a('object');
        res.body.message.should.equal('Article has been published');
        done();
      });
  });
  it('Should test slug validator and reject request if slug characters are minimum to 10', (done) => {
    const smallSlug = { ...article, title: 'Hey' };
    chai
      .request(app)
      .post('/api/v1/articles')
      .set('access-token', accessToken)
      .send(smallSlug)
      .end((err, res) => {
        expect(res).to.have.status(status.BAD_REQUEST);
        res.body.should.be.an('object');
        res.body.errors.should.be.a('array');
        done();
      });
  });
  it('Should unpublish an article', (done) => {
    const unpublish = { ...article, slug: 'rosie-make-it-easy-1dh6jv9cn4sz' };
    chai
      .request(app)
      .put(`/api/v1/articles/${articleSlug}/unpublish`)
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res).to.have.status(status.OK);
        res.body.should.be.a('object');
        res.body.message.should.equal('Article has been unpublished');
        done();
      });
  });

  it('Should delete article', (done) => {
    // const deleteArticle = { ...article, slug: 'rosie-make-it-easy-1dh6jv9cn4sz' };
    chai
      .request(app)
      .delete(`/api/v1/articles/${articleSlug}`)
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res).to.have.status(status.OK);
        res.body.should.be.an('object');
        res.body.message.should.equal('Article has been deleted');
        done();
      });
  });
  it('Should not create article if the author does not exist', (done) => {
    delete article.id;
    delete article.slug;
    delete article.readTime;
    const fakeArticle = { ...article, userId: 28768879 };
    chai
      .request(app)
      .post('/api/v1/articles')
      .send(fakeArticle)
      .set('access-token', 'brabra')
      .end((err, res) => {
        expect(res).to.have.status(status.UNAUTHORIZED);
        res.body.should.be.an('object');
        res.body.should.have.property('errors');
        res.body.errors.token.should.equal('Failed to authenticate token');
        done();
      });
  });
});
