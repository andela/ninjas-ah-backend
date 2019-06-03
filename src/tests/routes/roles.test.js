/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../../models';
import * as permissions from '../../config/permissions';
import status from '../../config/status';
import * as Factory from '../../helpers/factory';
import app from '../../app';

dotenv.config();

const { expect } = chai;

let accessTokenAdmin = '';
let createdUserAdmin = '';
let createdUserNormal = '';

const userAdmin = Factory.userAdmin.build();
const userNormal = Factory.userNormal.build();
delete userAdmin.id;
delete userNormal.id;
describe('Roles and Access control', () => {
  before(async () => {
    try {
      await db.User.destroy({
        truncate: true,
        cascade: true,
        logging: false
      });

      createdUserAdmin = (await db.User.create(userAdmin, { logging: false })).dataValues;
      createdUserNormal = (await db.User.create(userNormal, { logging: false })).dataValues;
      accessTokenAdmin = jwt.sign(
        {
          id: createdUserAdmin.id,
          role: createdUserAdmin.role,
          permissions: createdUserAdmin.permissions
        },
        process.env.SECRET_KEY,
        { expiresIn: '1d' }
      );
    } catch (error) {
      return error;
    }
  });

  it('return 404 if user does not exist', (done) => {
    chai
      .request(app)
      .put('/api/v1/users/roles/deschamps')
      .set('access-token', accessTokenAdmin)
      .send({ role: 'admin' })
      .end((err, res) => {
        expect(res.status).to.be.equal(status.NOT_FOUND);
        expect(res.body).to.not.include.keys('errors');
        done();
      });
  });

  it('successfully changes a user role', (done) => {
    const requestBody = {
      role: 'admin'
    };
    chai
      .request(app)
      .put(`/api/v1/users/roles/${createdUserNormal.username}`)
      .set('access-token', accessTokenAdmin)
      .send(requestBody)
      .end((err, res) => {
        expect(res.status).to.be.equal(status.OK);
        expect(res.body.message).to.eql('roles updated successfully');
        done();
      });
  });

  it('should return EXIST if the user is already an admin', (done) => {
    chai
      .request(app)
      .put(`/api/v1/users/roles/${createdUserNormal.username}`)
      .set('access-token', accessTokenAdmin)
      .send({ role: 'admin' })
      .end((err, res) => {
        expect(res.status).to.be.equal(status.EXIST);
        done();
      });
  });

  it('should return BAD REQUEST when the request body is empty', (done) => {
    chai
      .request(app)
      .put(`/api/v1/users/roles/${createdUserNormal.username}`)
      .set('access-token', accessTokenAdmin)
      .send('')
      .end((err, res) => {
        expect(res.status).to.be.equal(status.BAD_REQUEST);
        done();
      });
  });
});
