module.exports = (sequelize, DataTypes) => {
  const ChatGroupMember = sequelize.define(
    'ChatGroupMember',
    {
      chatGroupId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
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
        type: DataTypes.INTEGER,
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
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {}
  );
  ChatGroupMember.associate = (models) => {
    ChatGroupMember.belongsTo(models.User, { foreignKey: 'userId' });
    ChatGroupMember.belongsTo(models.ChatGroup, { foreignKey: 'chatGroupId' });
  };
  return ChatGroupMember;
};
