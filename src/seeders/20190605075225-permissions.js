import * as Factory from '../helpers/factory';

const permissionsNormal = Factory.permissionsNormal.build();
const permissionsAdmin = Factory.permissionsAdmin.build();
permissionsNormal.createdAt = new Date();
permissionsNormal.updatedAt = new Date();
permissionsAdmin.createdAt = new Date();
permissionsAdmin.updatedAt = new Date();

export default {
  up: queryInterface => queryInterface.bulkInsert('Permissions', [permissionsNormal, permissionsAdmin], {}),

  down: queryInterface => queryInterface.bulkDelete('Permissions', null, {})
};
