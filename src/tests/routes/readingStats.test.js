/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import * as Factory from '../../helpers/factory';
import status from '../../config/status';
import db from '../../models';
import app from '../../app';

chai.use(chaiHttp);
chai.should();
let accessToken;
let createdUser = {};
let createdArticle = {};

const newUser = Factory.user.build();
const newArticle = Factory.article.build();

delete newUser.id;
delete newArticle.id;

describe('Reading Stats', () => {
  before(async () => {
    try {
      await db.User.destroy({
        truncate: true,
        cascade: true,
        logging: false
      });

      createdUser = (await db.User.create(newUser, { logging: false })).dataValues;
      accessToken = jwt.sign(
        { id: createdUser.id, role: createdUser.role, permissions: createdUser.permissions },
        process.env.SECRET_KEY,
        { expiresIn: '1d' }
      );
      newArticle.userId = createdUser.id;
      createdArticle = (await db.Article.create(newArticle, { logging: false })).dataValues;
    } catch (err) {
      throw err;
    }
  });

  it('Should let the user save a reading stats', (done) => {
    chai
      .request(app)
      .post(`/api/v1/user/profile/${createdArticle.slug}/stats`)
      .set('access-token', accessToken)
      .end((err, res) => {
        res.should.have.status(status.OK);
        done();
      });
  });

  it('Should let the user get reading stats', (done) => {
    chai
      .request(app)
      .get('/api/v1/user/profile/stats')
      .set('access-token', accessToken)
      .end((err, res) => {
        res.should.have.status(status.OK);
        done();
      });
  });
});
