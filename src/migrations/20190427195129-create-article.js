export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Articles', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    slug: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true
    },
    body: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    tagList: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true
    },
    status: {
      type: Sequelize.ENUM('draft', 'published', 'deleted'),
      allowNull: false,
      defaultValue: 'draft'
    },
    coverUrl: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    readTime: {
      type: Sequelize.STRING,
      allowNull: true
    },
    favorited: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    favoritesCount: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0
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
  down: queryInterface => queryInterface.dropTable('Articles')
};
