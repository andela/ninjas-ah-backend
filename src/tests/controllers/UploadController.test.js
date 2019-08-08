import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import path from 'path';
import express from 'express';
import cloudinary from 'cloudinary';
import app from '../../app';
import status from '../../config/status';
import db from '../../models';
import * as Factory from '../../helpers/factory';
import UploadController from '../../controllers/UploadController';

const { expect } = chai;
chai.should();

const appLocal = express();
const router = express.Router();

appLocal.use(express.json());
appLocal.use(
  express.urlencoded({
    extended: false
  })
);

appLocal.use('/api/v1/upload', router.post('/', UploadController.save));

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
  it('Should not upload image if no image selected', (done) => {
    chai
      .request(appLocal)
      .post('/api/v1/upload')
      .set('access-token', accessToken)
      .end((err, res) => {
        res.status.should.equal(status.BAD_REQUEST);
        done();
      });
  });
});
