module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        lastName: 'John',
        firstName: 'Doe',
        email: 'john@doe.com',
        password: '123123',
        username: 'johndoe',
        role: 'normal',
        permissions: '{"can-edit"}',
        image: 'user.png',
        bio: 'I can do magic easy',
        createdAt: '2019-04-29T22:00:00',
        updatedAt: '2019-04-29T22:00:00'
      }
    ],
    {}
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};
