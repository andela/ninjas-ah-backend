export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('FavoriteArticles', {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    articleSlug: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('FavoriteArticles')
};
