'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Articles',
      [
        {
          userId: 1,
          slug: 'article slug',
          title: 'Article title',
          description: 'Article description',
          body: 'Article body',
          tags: '{"can-edit"}',
          status: 'draft',
          readTime: '5min',
          createdAt: '2019-04-29T22:00:00',
          updatedAt: '2019-04-29T22:00:00'
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Articles', null, {});
  }
};
