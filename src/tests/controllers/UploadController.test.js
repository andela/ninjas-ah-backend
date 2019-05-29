import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../../app';
import status from '../../config/status';
import db from '../../models';
import * as Factory from '../../helpers/factory';

const { expect } = chai;
chai.should();

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

  it('Should upload image', (done) => {
    chai
      .request(app)
      .post('/api/v1/upload')
      .send()
      .field('Content-Type', 'multipart/form-data')
      .field('fileName', 'ninja.png')
      .attach('image', './templates/images/ninja.png')
      .set('access-token', accessToken)
      .end((err, res) => {
        expect(res).to.have.status(status.CREATED);
        res.body.should.be.an('object');
        res.body.image.should.be.an('object');
        res.body.image.info.should.be.an('object');
        res.body.image.image.should.be.an('object');
        done();
      });
  });
  it('Should not upload image', (done) => {
    chai
      .request(app)
      .post('/api/v1/upload')
      .set('access-token', accessToken)
      .end((err, res) => {
        console.log('rwimg', res.body);
        expect(res).to.have.status(status.BAD_REQUEST);
        res.body.errors.should.be.an('object');
        res.body.errors.image.should.equal(
          'Whoops, something went wrong while uploading your image. try again!'
        );
        done();
      });
  });
});
