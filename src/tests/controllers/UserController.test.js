/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../../app';
import status from '../../config/status';
import db from '../../models';
import * as Factory from '../../helpers/factory';

chai.should();
chai.use(chaiHttp);
const user = Factory.user.build();

let userToken = '';
let accessToken = '';
const fakeToken = jwt.sign(
  {
    id: {},
    role: user.role,
    permissions: user.permissions
  },
  process.env.SECRET_KEY,
  { expiresIn: '1d' }
);
// user test
let theNewUser;
let createdUser;
describe('user tests', () => {
  // test signup;
  before(async () => {
    try {
      await db.User.destroy({
        truncate: true,
        cascade: true,
        logging: false
      });
      theNewUser = {
        firstName: 'prince',
        lastName: 'sengayireman',
        username: 'daprinceHero',
        email: 'psengayire119@gmail.com',
        password: 'Prince@1234',
        role: 'admin',
        isActive: true
      };
      createdUser = (await db.User.create(theNewUser, { logging: false })).get();
      accessToken = jwt.sign(
        {
          id: createdUser.id,
          role: createdUser.role,
          permissions: user.permissions
        },
        process.env.SECRET_KEY,
        { expiresIn: '1d' }
      );
    } catch (error) {
      throw error;
    }
  });
  describe('user signup', () => {
    delete user.id;
    it('Should not register new user when pass role and permission', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.body.should.be.an('object');
          res.status.should.be.equal(status.UNAUTHORIZED);
          done();
        });
    });
    it('Should register new user', (done) => {
      delete user.role;
      delete user.permissions;
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.body.should.be.an('object');
          done();
        });
    });
    it('chatch error', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send('...')
        .end((err, res) => {
          res.status.should.be.equal(status.BAD_REQUEST);
          done();
        });
    });
    it('Should fail to register new user if exists', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.body.should.be.an('object');
          res.status.should.be.equal(status.EXIST);
          res.body.should.have.property('errors');
          done();
        });
    });
    it('Should fail to register new user if any input missing', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: '',
          lastName: '',
          username: '',
          email: '',
          password: ''
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.status.should.be.equal(status.BAD_REQUEST);
          done();
        });
    });
  });
  // test sign in
  describe('user sign in', () => {
    const userSignIn = {
      email: user.email,
      password: user.password,
      isActive: true
    };
    it('should activate user account', (done) => {
      const userAccessToken = jwt.sign(
        {
          email: user.email,
          expiresIn: '2h'
        },
        process.env.SECRET_KEY,
        { expiresIn: '1d' }
      );
      chai
        .request(app)
        .get(`/api/v1/auth/activate/${userAccessToken}`)
        .set('access-token', userAccessToken)
        .end((err, res) => {
          chai.expect(res).to.redirect;
          done();
        });
    });
    // test user sign in
    it('sign in user', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(userSignIn)
        .end((err, res) => {
          userToken = res.body.token;
          res.body.should.be.an('object');
          res.status.should.be.equal(status.OK);
          res.body.should.have.property('token');
          done();
        });
    });
    it(' should fail if password not match', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({
          email: user.email,
          password: '12313223123'
        })
        .end((err, res) => {
          res.status.should.be.equal(status.UNAUTHORIZED);
          done();
        });
    });
  });

  it(' should fail if password is not valid', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: user.email,
        password: ''
      })
      .end((err, res) => {
        res.status.should.be.equal(status.BAD_REQUEST);
        done();
      });
  });

  it(' should fail if email is not valid', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'user.email',
        password: 'prince'
      })
      .end((err, res) => {
        res.status.should.be.equal(status.UNAUTHORIZED);
        done();
      });
  });
  describe('admin test', () => {
    const Adminuser = Factory.user.build();
    it('admin can create user', (done) => {
      Adminuser.permissions = JSON.parse(Adminuser.permissions);
      Adminuser.username = 'prince';
      Adminuser.email = 'princesengayire@andela.com';
      delete Adminuser.id;
      chai
        .request(app)
        .post('/api/v1/users/')
        .set('access-token', accessToken)
        .send(Adminuser)
        .end((err, res) => {
          res.body.should.be.an('object');
          res.status.should.be.equal(status.CREATED);
          done();
        });
    });

    it('should not create user when exists', (done) => {
      chai
        .request(app)
        .post('/api/v1/users/')
        .set('access-token', accessToken)
        .send(Adminuser)
        .end((err, res) => {
          res.body.should.be.an('object');
          res.status.should.be.equal(status.EXIST);
          done();
        });
    });

    it('should not create user if all filed are not there', (done) => {
      delete Adminuser.firstName;
      delete Adminuser.role;
      delete Adminuser.permissions;
      chai
        .request(app)
        .post('/api/v1/users/')
        .set('access-token', accessToken)
        .send(Adminuser.lastName)
        .end((err, res) => {
          res.body.should.be.an('object');
          res.status.should.be.equal(status.BAD_REQUEST);
          done();
        });
    });
    it('should delete user', async () => {
      const newUser = {
        firstName: 'prince',
        lastName: 'sengayire',
        username: 'daprince333',
        email: 'kagaramag1200gg@gmail.com',
        password: 'Prince@1234',
        isActive: true,
        role: 'admin',
        permissions:
          '{"articles":["read","delete"],"comments":["read","delete"],"tags":["read","create","delete"],"users":["read","create","edit","delete"],"permissions":["read","create","edit","delete"]}'
      };
      const createUser = await db.User.create(newUser, { logging: false });
      const { id } = createUser.dataValues;
      chai
        .request(app)
        .delete(`/api/v1/users/${id}`)
        .set('access-token', accessToken)
        .end((err, res) => {
          res.status.should.be.equal(status.OK);
        });
    });

    // follow user
    it('follow user', (done) => {
      const { username } = createdUser;
      chai
        .request(app)
        .patch(`/api/v1/users/${username}/follow`)
        .set('access-token', userToken)
        .end((err, res) => {
          res.status.should.be.equal(status.CREATED);
          done();
        });
    });
    it('should not follow user when the follower id is not valid', (done) => {
      const { username } = createdUser;
      chai
        .request(app)
        .patch(`/api/v1/users/${username}/unfollow`)
        .set('access-token', fakeToken)
        .end((err, res) => {
          res.status.should.be.equal(status.SERVER_ERROR);
          done();
        });
    });
    it('fail to follow user when already following that user', (done) => {
      const { username } = createdUser;
      chai
        .request(app)
        .patch(`/api/v1/users/${username}/follow`)
        .set('access-token', userToken)
        .end((err, res) => {
          res.status.should.be.equal(status.EXIST);
          done();
        });
    });

    it('should not allow to follow your self', (done) => {
      const { username } = user;
      chai
        .request(app)
        .patch(`/api/v1/users/${username}/follow`)
        .set('access-token', userToken)
        .end((err, res) => {
          res.status.should.be.equal(status.BAD_REQUEST);
          done();
        });
    });
    it("should not get user's followers", (done) => {
      chai
        .request(app)
        .get('/api/v1/users/followers')
        .set('access-token', userToken)
        .end((err, res) => {
          res.status.should.be.equal(status.NOT_FOUND);
          done();
        });
    });
    it("get user's followers", (done) => {
      const Token = jwt.sign(
        {
          id: createdUser.id,
          role: createdUser.role,
          permissions: createdUser.permissions
        },
        process.env.SECRET_KEY,
        { expiresIn: '1d' }
      );
      chai
        .request(app)
        .get('/api/v1/users/followers')
        .set('access-token', Token)
        .end((err, res) => {
          res.status.should.be.equal(status.OK);
          done();
        });
    });
    it("get all user's following ", (done) => {
      chai
        .request(app)
        .get('/api/v1/users/following')
        .set('access-token', userToken)
        .end((err, res) => {
          res.status.should.be.equal(status.OK);
          done();
        });
    });
    it('should not return followers', (done) => {
      chai
        .request(app)
        .get('/api/v1/users/following')
        .set('access-token', accessToken)
        .end((err, res) => {
          res.status.should.be.equal(status.NOT_FOUND);
          done();
        });
    });
    it('unfollow user ', (done) => {
      const { username } = createdUser;
      chai
        .request(app)
        .patch(`/api/v1/users/${username}/unfollow`)
        .set('access-token', userToken)
        .end((err, res) => {
          res.status.should.be.equal(status.OK);
          done();
        });
    });

    it('should not unfollow user when not found', (done) => {
      const { username } = 'princho';
      chai
        .request(app)
        .patch(`/api/v1/users/${username}/unfollow`)
        .set('access-token', userToken)
        .end((err, res) => {
          res.status.should.be.equal(status.BAD_REQUEST);
          done();
        });
    });

    it('should not unfollow user when not following', (done) => {
      const { username } = Adminuser;
      chai
        .request(app)
        .patch(`/api/v1/users/${username}/unfollow`)
        .set('access-token', userToken)
        .end((err, res) => {
          res.status.should.be.equal(status.BAD_REQUEST);
          done();
        });
    });

    it('return all users', (done) => {
      chai
        .request(app)
        .get('/api/v1/users?limit=1&offset=0')
        .set('access-token', accessToken)
        .end((err, res) => {
          res.body.should.be.an('object');
          res.status.should.be.equal(status.OK);
          done();
        });
    });
  });
});
