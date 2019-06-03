/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import db from '../../../models';
import { User } from '../../../queries';
import * as Factory from '../../../helpers/factory';

const { expect } = chai;

const { permissions } = Factory.permissionsNormal.build();
describe('Find or create permissions query', () => {
  before(async () => {
    try {
      await db.Permission.destroy({
        truncate: true,
        cascade: true,
        logging: false
      });
    } catch (error) {
      throw error;
    }
  });

  it('should throw an error', async () => {
    const newPermissions = await User.permissions.create();
    expect(newPermissions).to.include.keys('errors');
  });

  it('should create permissions', async () => {
    const newPermissions = await User.permissions.create('normal', permissions);
    expect(Object.keys(newPermissions).length).to.be.above(0);
    expect(newPermissions).to.not.include.keys('errors');
  });

  it('should not create permissions if it is already created', async () => {
    const newPermissions = await User.permissions.create('normal', permissions);
    expect(newPermissions).to.include.keys('errors');
  });
});
