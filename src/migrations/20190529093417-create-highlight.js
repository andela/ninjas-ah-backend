module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Highlights', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    articleSlug: {
      type: Sequelize.STRING,
      allowNull: false
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    highlightedText: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'highlightedText'
    },
    startIndex: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'startIndex'
    },
    stopIndex: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'stopIndex'
    },
    comment: {
      type: Sequelize.TEXT
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
  down: queryInterface => queryInterface.dropTable('Highlights')
};
