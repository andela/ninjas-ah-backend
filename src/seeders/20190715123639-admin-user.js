import * as Factory from '../helpers/factory';
import { password } from '../helpers';

const userAdmin = {
  firstName: 'admin',
  lastName: 'admin',
  username: 'admin',
  email: 'admin@admin.admin',
  password: password.hash('admin'),
  role: 'admin',
  isActive: true,
  permissions: Factory.permissionsAdmin.build().permissions,
  createdAt: new Date(),
  updatedAt: new Date()
};

export default {
  up: queryInterface => queryInterface.bulkInsert('Users', [userAdmin], {}),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
