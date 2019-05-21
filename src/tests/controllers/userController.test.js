/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../../app';
import status from '../../config/status';
import db from '../../models';
import { User } from '../../queries';
import * as Factory from '../../helpers/factory';

chai.should();
chai.use(chaiHttp);
const user = Factory.user.build();

let userToken = '';
// user test

describe('user tests', () => {
  // test signup;
  before(async () => {
    try {
      await db.User.destroy({
        truncate: true,
        cascade: true,
        logging: false
      });
    } catch (error) {
      throw error;
    }
  });
  describe('user signup', () => {
    it('fail to return all users', (done) => {
      const accessToken = jwt.sign(
        {
          id: user.id,
          role: user.role,
          permissions: user.permissions
        },
        process.env.SECRET_KEY,
        { expiresIn: '1d' }
      );
      chai
        .request(app)
        .get('/api/v1/users/')
        .set('access-token', accessToken)
        .end((err, res) => {
          res.body.should.be.an('object');
          res.status.should.be.equal(status.NOT_FOUND);
          done();
        });
    });
    delete user.id;
    it('Should register new user', (done) => {
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
          res.body.should.have.property('message');
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
      password: user.password
    };
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
  describe('admin test', () => {
    const Adminuser = Factory.user.build();
    it('admin can create user', (done) => {
      Adminuser.username = 'prince';
      Adminuser.email = 'princesengayire@andela.com';
      delete Adminuser.id;
      chai
        .request(app)
        .post('/api/v1/users/')
        .set('access-token', userToken)
        .send(Adminuser)
        .end((err, res) => {
          res.body.should.be.an('object');
          res.status.should.be.equal(status.CREATED);
          done();
        });
    });

    it('should not create user when exists', (done) => {
      delete Adminuser.role;
      delete Adminuser.permissions;
      chai
        .request(app)
        .post('/api/v1/users/')
        .set('access-token', userToken)
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
        .set('access-token', userToken)
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
        username: 'daprince33',
        email: 'kagaramag1200gg@gmail.com',
        password: 'Prince@1234',
        role: 'admin'
      };
      const createUser = await db.User.create(newUser, { logging: false });
      const { id } = createUser.dataValues;
      chai
        .request(app)
        .delete(`/api/v1/users/${id}`)
        .set('access-token', userToken)
        .end((err, res) => {
          res.status.should.be.equal(status.OK);
        });
    });
    it('return all users', (done) => {
      chai
        .request(app)
        .get('/api/v1/users/')
        .set('access-token', userToken)
        .end((err, res) => {
          res.body.should.be.an('object');
          res.status.should.be.equal(status.OK);
          User.findAll();
          done();
        });
    });
  });
});
