export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ReportArticles', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
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
    articleSlug: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'Articles',
        key: 'slug'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    reportTitle: {
      type: Sequelize.STRING,
      allowNull: false
    },
    reportBody: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    type: { type: Sequelize.ARRAY(Sequelize.STRING), allowNull: true },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('ReportArticles')
};
