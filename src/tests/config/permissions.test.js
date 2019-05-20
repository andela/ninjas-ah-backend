/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import db from '../../models';
import * as Factory from '../../helpers/factory';
import permissions from '../../config/permissions';

const { expect } = chai;

chai.use(chaiHttp);

const newPermissionNormal = Factory.permissionsNormal.build();
const newPermissionAdmin = Factory.permissionsAdmin.build();

describe('Permissions', () => {
  before(async () => {
    await db.Permission.destroy({
      truncate: true,
      cascade: true,
      logging: false
    });
    await db.Permission.create(newPermissionNormal, { logging: false });
    await db.Permission.create(newPermissionAdmin, { logging: false });
  });
  it('should return all permissions', async () => {
    const allPermissions = await permissions();
  });
});
