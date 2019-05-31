import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import path from 'path';
import app from '../../app';
import status from '../../config/status';
import db from '../../models';
import * as Factory from '../../helpers/factory';

const { expect } = chai;
chai.should();

const article = Factory.article.build();
delete article.id;

const user = Factory.user.build();
chai.use(chaiHttp);
let accessToken = '';
let createdUser = '';
delete user.id;
user.email = 'multer@haven.com';
user.username = 'multer123';
describe('UPLOAD', () => {
  before(async () => {
    createdUser = (await db.User.create(user, { logging: false })).dataValues;
    accessToken = jwt.sign(
      { id: createdUser.id, role: createdUser.role, permissions: createdUser.permissions },
      process.env.SECRET_KEY,
      { expiresIn: '1d' }
    );
  });
  it('should get error if no gallery found', (done) => {
    chai
      .request(app)
      .get('/api/v1/gallery')
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res).to.have.status(status.NOT_FOUND);
        res.body.should.be.an('object');
        res.body.errors.should.be.an('object');
        res.body.errors.gallery.should.be.an('string');
        res.body.errors.gallery.should.equal("You don't have image gallery yet");
        done();
      });
  });
  it('Should return true if user can be able to upload image', (done) => {
    chai
      .request(app)
      .post('/api/v1/upload')
      .send()
      .field('Content-Type', 'multipart/form-data')
      .field('fileName', 'ninja.png')
      .attach('image', path.join(__dirname, '../../../templates/images/ninja.png'))
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res).to.have.status(status.SERVER_ERROR);
        res.body.should.be.an('object');
        res.body.errors.should.be.an('object');
        done();
      });
  });

  it('Should not upload image if no image selected', (done) => {
    chai
      .request(app)
      .post('/api/v1/upload')
      .set('access-token', accessToken)
      .end((err, res) => {
        res.body.errors.should.be.an('object');
        res.status.should.equal(status.BAD_REQUEST);
        done();
      });
  });
});
