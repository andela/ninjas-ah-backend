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
    const newOrExistingPermissions = await User.permissions.findOrCreate();
    expect(newOrExistingPermissions).to.include.keys('errors');
  });

  it('should create permissions', async () => {
    const newOrExistingPermissions = await User.permissions.findOrCreate('normal', permissions);
    expect(Object.keys(newOrExistingPermissions[0]).length).to.be.above(0);
    expect(newOrExistingPermissions[1]).to.be.equal(true);
  });

  it('should not create permissions if it is already created', async () => {
    const newOrExistingPermissions = await User.permissions.findOrCreate('normal', permissions);
    expect(Object.keys(newOrExistingPermissions[0]).length).to.be.above(0);
    expect(newOrExistingPermissions[1]).to.be.equal(false);
  });
});
