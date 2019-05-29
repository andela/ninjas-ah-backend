module.exports = {
  up: queryInterface => queryInterface.bulkInsert(
    'Users',
    [
      {
        lastName: 'John',
        firstName: 'Doe',
        email: 'john@doe.com',
        password: '123123',
        username: 'johndoe',
        role: 'normal',
        permissions: ['read'],
        image: 'user.png',
        bio: 'I can do easy magic',
        createdAt: '2019-05-14T22:00:00',
        updatedAt: '2019-05-14T22:00:00'
      },
      {
        lastName: 'Lorem',
        firstName: 'Ipsum',
        email: 'lorem@ipsum.com',
        password: '123123',
        username: 'lorum',
        role: 'normal',
        permissions: '{"can-edit"}',
        image: 'user.png',
        bio: 'Lorem ipsum',
        createdAt: '2019-05-12T22:00:00',
        updatedAt: '2019-05-15T22:00:00'
      }
    ],
    {}
  ),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
