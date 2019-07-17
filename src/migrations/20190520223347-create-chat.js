export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Chats', {
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
    message: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    chatGroupId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 1
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
  down: queryInterface => queryInterface.dropTable('Chats')
};
