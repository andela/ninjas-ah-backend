export default {
  up: (queryInterface, Sequelize) => queryInterface.changeColumn('ArticleBookmarks', 'articleSlug', {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'Articles',
      key: 'slug'
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.changeColumn('ArticleBookmarks', 'articleSlug', {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  })
};
