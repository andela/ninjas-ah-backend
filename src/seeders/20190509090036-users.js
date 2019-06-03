import * as Factory from '../helpers/factory';

const user = Factory.user.build();
user.createdAt = '2019-05-12T22:00:00';
user.updatedAt = '2019-05-12T22:00:00';
delete user.id;

export default {
  up: queryInterface => queryInterface.bulkInsert('Users', [user], {}),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
