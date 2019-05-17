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

describe('No articles', () => {
  before(async () => {
    await db.Article.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
      logging: false
    });
  });

  describe('Test not-found articles', () => {
    let author = 0;
    after(async () => {
      const findUser = await db.User.findAll({ limit: 1, logging: false });
      author = findUser[0].dataValues.id;
      const initalArticle = article;
      delete initalArticle.id;
      initalArticle.userId = author;
      delete initalArticle.readTime;
      await db.Article.create(initalArticle, { logging: false });
    });
    it('Should test slug validator and reject request if slug characters are minimum to 10', (done) => {
      const token = 'token-string';
      chai
        .request(app)
        .put('/api/v1/articles/foo/publish')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.have.status(status.BAD_REQUEST);
          res.body.should.be.an('object');
          res.body.errors.should.be.an('array');
          done();
        });
    });
    it('Should not get articles if article table is empty', async () => {
      const token = 'token-string';
      chai
        .request(app)
        .get('/api/v1/articles')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.have.status(status.NOT_FOUND);
          res.body.should.be.an('object');
          res.body.message.should.equal('No articles found');
        });
    });
    it('Should not get articles if table is empty', async () => {
      const token = 'token-string';
      chai
        .request(app)
        .get(`/api/v1/articles/${article.slug}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.have.status(status.NOT_FOUND);
          res.body.should.be.an('object');
          res.body.error.should.equal('No article found');
        });
    });

    it('Should not update if author does not exist', async () => {
      delete article.id;
      const fakeArticle1 = { ...article, slug: 'fake-easy-opojvbldff' };
      delete fakeArticle1.userId;
      const token = 'token-string';
      chai
        .request(app)
        .put('/api/v1/articles/invalid-bad-pkljvbm1e9o')
        .set('Authorization', `Bearer ${token}`)
        .send(fakeArticle1)
        .end((err, res) => {
          expect(res).to.have.status(status.BAD_REQUEST);
          res.body.should.be.an('object');
          res.body.errors.should.be.an('array');
        });
    });
    it('Should not update if slug article is not valid', async () => {
      delete article.id;
      const fakeArticle1 = { ...article, slug: 'fake-easy-opojvbldff' };
      delete fakeArticle1.userId;
      const token = 'token-string';
      chai
        .request(app)
        .put('/api/v1/articles/invalid-bad-pkljvbm1e9o')
        .set('Authorization', `Bearer ${token}`)
        .send(fakeArticle1)
        .end((err, res) => {
          expect(res).to.have.status(status.BAD_REQUEST);
          res.body.should.be.an('object');
          res.body.errors.should.be.an('array');
        });
    });
    it('Should not unpublish a non-existing article', async () => {
      const token = 'token-string';
      chai
        .request(app)
        .put('/api/v1/articles/invali-6jv9cn4szf/unpublish')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.have.status(status.NOT_FOUND);
          res.body.should.be.a('object');
          res.body.error.should.equal('No article found');
        });
    });
    it('Should not publish a non-existing article', async () => {
      const token = 'token-string';
      chai
        .request(app)
        .put('/api/v1/articles/invalid-1632jv5quc9c/publish')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.have.status(status.NOT_FOUND);
          res.body.should.be.a('object');
          res.body.error.should.equal('No article found');
        });
    });
  });
});

describe('Article', () => {
  let author = 0;
  const token = 'token-string';
  let articleSlug = '';
  before(async () => {
    const findUser = await db.User.findAll({ limit: 1, logging: false });
    author = findUser[0].dataValues.id;
    const { dataValues } = await db.Article.findOne({ where: { id: 1 } }, { logging: false });
    articleSlug = dataValues.slug;
  });
  //   // create article
  it('Should successfully create an article', (done) => {
    delete article.id;
    delete article.slug;
    delete article.readTime;
    chai
      .request(app)
      .post('/api/v1/articles')
      .send(article)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        const response = res.body;
        expect(res).to.have.status(status.CREATED);
        response.article.status.should.be.a('string');
        response.article.title.should.be.a('string');
        response.article.body.should.be.a('string');
        response.article.slug.should.be.a('string');
        response.article.coverUrl.should.be.a('string');
        expect(response.article.userId).should.be.an('object');
        done();
      });
  });
  it('Should successfully create an article even if title is more than 70 characters', (done) => {
    delete article.id;
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
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        const response = res.body;
        expect(res).to.have.status(status.CREATED);
        response.article.status.should.be.a('string');
        response.article.title.should.be.a('string');
        response.article.body.should.be.a('string');
        response.article.slug.should.be.a('string');
        response.article.coverUrl.should.be.a('string');
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
      .set('Authorization', `Bearer ${token}`)
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
      .set('Authorization', `Bearer ${token}`)
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
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        const response = res.body;
        expect(res).to.have.status(status.CREATED);
        response.article.status.should.be.a('string');
        response.article.title.should.be.a('string');
        response.article.body.should.be.a('string');
        response.article.slug.should.be.a('string');
        response.article.coverUrl.should.be.a('string');
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
      .send(article)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        res.body.errors.should.be.a('array');
        done();
      });
  });
  it('Should not create the article if the content is less than 5 characters', async () => {
    delete article.id;
    delete article.slug;
    delete article.userId;
    delete article.readTime;
    article.body = 'Hey';
    chai
      .request(app)
      .post('/api/v1/articles')
      .send(article)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(status.BAD_REQUEST);
        res.body.errors.should.be.a('array');
      });
  });
  it('Should trim empty spaces before the content of the article and after the last letter of the content', async () => {
    delete article.id;
    delete article.slug;
    delete article.readTime;
    article.body = ' More about this the dance of chicken ';
    const fakeArticle3 = { ...article, userId: author };
    chai
      .request(app)
      .post('/api/v1/articles')
      .send(fakeArticle3)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        const response = res.body;
        expect(res).to.have.status(status.CREATED);
        response.article.status.should.be.a('string');
        response.article.title.should.be.a('string');
        response.article.body.should.be.a('string');
        response.article.slug.should.be.a('string');
        response.article.coverUrl.should.be.a('string');
        expect(response.article.userId).should.be.an('object');
      });
  });
  it('Should get all articles', async () => {
    chai
      .request(app)
      .get('/api/v1/articles')
      .set('Authorization', `Bearer ${token}`)
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
        response.articles[0].coverUrl.should.be.a('string');
      });
  });
  it('Should get one article', async () => {
    const getArticle = { ...article, slug: 'rosie-make-it-easy-1dh6jv9cn4sz' };
    chai
      .request(app)
      .get(`/api/v1/articles/${getArticle.slug}`)
      .set('Authorization', `Bearer ${token}`)
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
      });
  });
  it('Should update the article', (done) => {
    delete article.id;
    let updateArticle = { ...article };
    delete updateArticle.slug;
    delete updateArticle.tagList;
    updateArticle = { ...updateArticle, readTime: 0 };
    chai
      .request(app)
      .put(`/api/v1/articles/${articleSlug}`)
      .send(updateArticle)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(status.OK);
        res.body.should.be.an('object');
        res.body.message.should.equal('Article has been updated');
        done();
      });
  });
  it('Should publish an article', (done) => {
    const publishArticle = { ...article, slug: 'rosie-make-it-easy-1dh6jv9cn4sz' };
    chai
      .request(app)
      .put(`/api/v1/articles/${publishArticle.slug}/publish`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(status.OK);
        res.body.should.be.a('object');
        res.body.message.should.equal('Article has been published');
        done();
      });
  });
  it('Should test slug validator and reject request if slug characters are minimum to 10', async () => {
    const smallSlug = { ...article, title: 'Hey' };
    chai
      .request(app)
      .post('/api/v1/articles')
      .set('Authorization', `Bearer ${token}`)
      .send(smallSlug)
      .end((err, res) => {
        expect(res).to.have.status(status.BAD_REQUEST);
        res.body.should.be.an('object');
        res.body.errors.should.be.a('array');
      });
  });
  it('Should unpublish an article', async () => {
    const unpublish = { ...article, slug: 'rosie-make-it-easy-1dh6jv9cn4sz' };
    chai
      .request(app)
      .put(`/api/v1/articles/${unpublish.slug}/unpublish`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(status.OK);
        res.body.should.be.a('object');
        res.body.message.should.equal('Article has been unpublished');
      });
  });
  it('Should delete article', async () => {
    const deleteArticle = { ...article, slug: 'rosie-make-it-easy-1dh6jv9cn4sz' };
    chai
      .request(app)
      .delete(`/api/v1/articles/${deleteArticle.slug}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(status.OK);
        res.body.should.be.an('object');
        res.body.message.should.equal('Article has been deleted');
      });
  });
  it('Should not create article if the author does not exist', async () => {
    delete article.id;
    delete article.slug;
    delete article.readTime;
    const fakeArticle = { ...article, userId: 28768879 };
    chai
      .request(app)
      .post('/api/v1/articles')
      .send(fakeArticle)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(status.SERVER_ERROR);
        res.body.should.be.an('object');
        res.body.message.should.be.a('string');
      });
  });
});
