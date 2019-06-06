import * as Factory from '../helpers/factory';

const permissionsNormal = Factory.permissionsNormal.build();
const permissionsAdmin = Factory.permissionsAdmin.build();
permissionsNormal.createdAt = '2019-05-12T22:00:00';
permissionsNormal.updatedAt = '2019-05-12T22:00:00';
permissionsAdmin.createdAt = '2019-05-12T22:00:00';
permissionsAdmin.updatedAt = '2019-05-12T22:00:00';

export default {
  up: queryInterface => queryInterface.bulkInsert('Permissions', [permissionsNormal, permissionsAdmin], {}),

  down: queryInterface => queryInterface.bulkDelete('Permissions', null, {})
};
