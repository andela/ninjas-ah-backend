import Chance from 'chance';

const chance = new Chance();
export default {
  up: queryInterface => queryInterface.bulkInsert(
    'Users',
    [
      {
        lastName: chance.first(),
        firstName: chance.last(),
        email: chance.email({ domain: 'example.com' }),
        password: '123123',
        username: chance.word({ length: 5 }),
        role: 'normal',
        permissions: ['read'],
        image: 'user.png',
        bio: chance.sentence(1),
        createdAt: '2019-04-29T22:00:00',
        updatedAt: '2019-04-29T22:00:00'
      }
    ],
    {}
  ),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
