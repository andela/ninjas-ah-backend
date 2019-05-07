/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

chai.use(chaiHttp);
chai.should();

let commentId;

describe('COMMENTS', () => {
  before(async () => {
    try {
      const comment = await chai
        .request(server)
        .post('/api/v1/articles/1/comments')
        .set('Content-Type', 'application/json')
        .send({ body: 'tests are passing' });
      commentId = comment.body.data.id;
    } catch (err) {
      console.log(err);
    }
  });
  it('Should not let the user create a comment with a wrong article Id', (done) => {
    const comment = {
      articleId: 2432332,
      userId: 1,
      body: 'Test of tests'
    };
    chai
      .request(server)
      .post('/api/v1/articles/23432332/comments')
      .send(comment)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('Should let the user create a comment', (done) => {
    const comment = {
      body: 'hahhahahahaha'
    };
    chai
      .request(server)
      .post('/api/v1/articles/1/comments')
      .send(comment)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
  it('Should not let the user create a comment with the wrong Id', (done) => {
    const comment = {
      body: 'hahhahahahaha'
    };
    chai
      .request(server)
      .post('/api/v1/articles/h/comments')
      .send(comment)
      .end((err, res) => {
        res.should.have.status(500);
        done();
      });
  });

  it('Should not let the user get all comments with the wrong article id', (done) => {
    chai
      .request(server)
      .get('/api/v1/articles/47726323/comments')
      .end((error, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('Should not let the user get all comments with the wrong article id', (done) => {
    chai
      .request(server)
      .get('/api/v1/articles/2/comments/')
      .end((error, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('Should not let the user get all comments with the wrong article id', (done) => {
    chai
      .request(server)
      .get('/jjjjj')
      .end((error, res) => {
        res.should.have.status(404);
        done();
      });
  });
  it('should get all comments of a specific article', (done) => {
    chai
      .request(server)
      .get('/api/v1/articles/1/comments')
      .end((error, res) => {
        console.log();
        res.should.have.status(200);
        done();
      });
  });
  it('should not get all comments of a specific article due to wrong inputs', (done) => {
    chai
      .request(server)
      .get('/api/v1/articles/h/comments')
      .end((error, res) => {
        res.should.have.status(500);
        done();
      });
  });
  it('Should not let the user edit a comment with a wrong article Id', (done) => {
    const comment = {
      body: 'Take test'
    };
    chai
      .request(server)
      .put('/api/v1/articles/23432332/comments/5')
      .send(comment)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('Should not let the user edit a comment with a wrong comment Id', (done) => {
    const comment = {
      body: 'Take test'
    };
    chai
      .request(server)
      .put('/api/v1/articles/1/comments/57647634')
      .send(comment)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('Should let the user edit a comment', (done) => {
    const comment = {
      body: 'Take test'
    };
    chai
      .request(server)
      .put(`/api/v1/articles/1/comments/${commentId}`)
      .send(comment)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('Should not let the user delete a comment with a wrong article Id', (done) => {
    const comment = {
      articleId: 2432332,
      user_id: 1,
      body: 'Take test'
    };
    chai
      .request(server)
      .delete('/api/v1/articles/23432332/comments/1')
      .send(comment)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('Should not let the user delete a comment with a wrong comment Id', (done) => {
    const comment = {
      articleId: 2432332,
      user_id: 1,
      body: 'Take test'
    };
    chai
      .request(server)
      .delete('/api/v1/articles/1/comments/57647634')
      .send(comment)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('Should let the user delete a comment', (done) => {
    chai
      .request(server)
      .delete(`/api/v1/articles/1/comments/${commentId}`)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
