/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../../models';
import status from '../../config/status';
import * as Factory from '../../helpers/factory';
import app from '../../app';

dotenv.config();

let accessToken;
let createdUserOne = {};

const userOne = Factory.user.build();
const userTwo = Factory.user.build();

delete userOne.id;
delete userTwo.id;

userTwo.email = 'email@gmail.ccom';
userTwo.username = 'newuser';

describe('All users', () => {
  before(async () => {
    try {
      await db.User.destroy({
        truncate: true,
        cascade: true,
        logging: false
      });
      createdUserOne = (await db.User.create(userOne, { logging: false })).dataValues;
      await db.User.create(userTwo, { logging: false });
      accessToken = jwt.sign(
        {
          id: createdUserOne.id,
          role: 'normal',
          permissions: createdUserOne.permissions
        },
        process.env.SECRET_KEY,
        { expiresIn: '1d' }
      );
    } catch (error) {
      throw error;
    }
  });

  it('should let a user see all authors', (done) => {
    chai
      .request(app)
      .get('/api/v1/users')
      .send()
      .set('access-token', accessToken)
      .end((err, res) => {
        res.should.have.status(status.OK);
        done();
      });
  });
});
