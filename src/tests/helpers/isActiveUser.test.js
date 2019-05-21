import chai from 'chai';
import chaiHttp from 'chai-http';
import db from '../../models';
import * as Factory from '../../helpers/factory';
import isActiveUser from '../../helpers/isActiveUser';

chai.should();

chai.use(chaiHttp);
const newUser = Factory.user.build();
delete newUser.id;
let activeUser = '';
let inactiveUser = '';

describe('test activated account', () => {
  before(async () => {
    try {
      await db.User.destroy({
        truncate: true,
        cascade: true,
        logging: false
      });
      newUser.isActive = true;
      activeUser = (await db.User.create(newUser, { logging: false })).dataValues;
      newUser.isActive = false;
      newUser.email = 'prince@gmail.com';
      newUser.username = 'prince';
      inactiveUser = (await db.User.create(newUser, { logging: false })).dataValues;
    } catch (error) {
      throw error;
    }
  });
  it('return false when user does not exist', async () => {
    await isActiveUser({ email: 'aaa@bbb.ccc' });
  });
  it('return false when user is not active', async () => {
    await isActiveUser({ email: inactiveUser.email });
  });

  it('return true when user is active', async () => {
    await isActiveUser({ email: activeUser.email });
  });
});
