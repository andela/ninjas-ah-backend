import * as Factory from '../helpers/factory';
import { password } from '../helpers';

const userAdmin = {
  firstName: 'admin',
  lastName: 'admin',
  username: 'admin',
  email: 'admin@admin.com',
  password: password.hash('admin'),
  role: 'admin',
  permissions: Factory.permissionsAdmin.build(),
  createdAt: '2019-05-12T22:00:00',
  updatedAt: '2019-05-12T22:00:00'
};

export default {
  up: queryInterface => queryInterface.bulkInsert('Users', [userAdmin], {}),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
