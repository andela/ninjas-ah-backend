export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ChatGroupMembers', {
    chatGroupId: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'ChatGroups',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    userId: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
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
  down: queryInterface => queryInterface.dropTable('ChatGroupMembers')
};
