/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import db from '../../models';
import passport from '../../config/passportLocalConfig';
import * as Factory from '../../helpers/factory';

chai.should();

chai.use(chaiHttp);
let user = {};
const theUser = Factory.user.build();
delete theUser.id;
describe('test local passport authenticate', () => {
  before(async () => {
    try {
      await db.User.destroy({ where: { email: theUser.email } });
      user = await db.User.create(theUser);
      theUser.id = user.dataValues.id;
    } catch (error) {
      return error;
    }
  });
  it('return authanticated user with JwtPayload', async () => {
    const checkUser = await passport({ id: user.dataValues.id }, (err, user) => user);
    chai.expect(Object.keys(checkUser).length).to.be.above(0);
  });
  it('fail when provide wrong token', async () => {
    const badId = '1000';
    const checkUser = await passport(
      {
        id: badId
      },
      (err, user) => user
    );
    chai.expect(Object.keys(checkUser).length).to.be.below(1);
  });
});
