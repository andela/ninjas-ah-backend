module.exports = {
  up: queryInterface => queryInterface.bulkInsert(
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
      },
      {
        userId: 1,
        slug: 'article slug2',
        title: 'Article title2',
        description: 'Article 2description',
        body: 'Article body2',
        tags: '{"can-edit"}',
        status: 'draft',
        readTime: '5min',
        createdAt: '2019-04-29T22:00:00',
        updatedAt: '2019-04-29T22:00:00'
      }
    ],
    {}
  ),

  down: queryInterface => queryInterface.bulkDelete('Articles', null, {})
};
