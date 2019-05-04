/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

chai.use(chaiHttp);
chai.should();
let commentId;
describe('COMMENTS', () => {
    beforeEach(()=>{
        const comment =
    })
  it('Should not let the user create a comment with a wrong article Id', async () => {
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
        res.should.have.status(404);
      });
  });
  it('Should let the user create a comment', async () => {
    const comment = {
      articleId: 1,
      userId: 1,
      body: 'take tests'
    };
    chai
      .request(server)
      .post('/api/v1/articles/1/comments')
      .send(comment)
      .end((err, res) => {
        commentId = res.body.data.id;
        //   commentId = res.body.data.id;
        console.log('jjjjjjjjjj', commentId);
        res.should.have.status(201);
      });
  });

  it('Should let the user get all comments', async () => {
    chai
      .request(server)
      .get('/api/v1/articles/47726323/comments')
      .end((error, res) => {
        res.should.have.status(404);
      });
  });
  it('should get all comments of a specific article', async () => {
    chai
      .request(server)
      .get('/api/v1/articles/1/comments')
      .end((error, res) => {
        console.log('hhhhhhhhhhh', commentId);
        res.should.have.status(200);
      });
  });
  it('Should not let the user edit a comment with a wrong article Id', async () => {
    const comment = {
      articleId: 2432332,
      user_id: 1,
      body: 'Take test'
    };
    chai
      .request(server)
      .put('/api/v1/articles/23432332/comments/1')
      .send(comment)
      .end((err, res) => {
        res.should.have.status(404);
      });
  });
  it('Should not let the user edit a comment with a wrong comment Id', async () => {
    const comment = {
      articleId: 2432332,
      user_id: 1,
      body: 'Take test'
    };
    chai
      .request(server)
      .put('/api/v1/articles/1/comments/57647634')
      .send(comment)
      .end((err, res) => {
        res.should.have.status(404);
      });
  });
  it('Should let the user edit a comment', async () => {
    const comment = {
      articleId: 1,
      user_id: 1,
      body: 'Take test'
    };
    chai
      .request(server)
      .put('/api/v1/articles/1/comments/6')
      .send(comment)
      .end((err, res) => {
        res.should.have.status(200);
      });
  });
  it('Should not let the user delete a comment with a wrong article Id', async () => {
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
        res.should.have.status(404);
      });
  });
  it('Should not let the user delete a comment with a wrong comment Id', async () => {
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
        res.should.have.status(404);
      });
  });
  it('Should let the user delete a comment', async () => {
    const comment = {
      articleId: 1,
      user_id: 1,
      body: 'Take test'
    };
    chai
      .request(server)
      .delete('/api/v1/articles/1/comments/6')
      .send(comment)
      .end((err, res) => {
        res.should.have.status(200);
      });
  });
});
