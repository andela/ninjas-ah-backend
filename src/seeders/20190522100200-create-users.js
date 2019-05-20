import * as helper from '../helpers';

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'jeanluc',
      lastName: 'tuyishime',
      username: 'lucas',
      email: 'luctunechi45@gmail.com',
      role: 'admin',
      password: helper.password.hash('password1'),
      bio: 'i am the admin',
      image: 'luc.png',
      permissions: 'read, delete',
      accountProvider: '',
      accountProviderUserId: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
