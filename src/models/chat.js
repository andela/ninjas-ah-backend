export default (sequelize, DataTypes) => {
  const Chat = sequelize.define(
    'Chat',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      chatGroupId: {
        type: DataTypes.INTEGER,
        allowNull: true
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
  Chat.associate = (models) => {
    Chat.belongsTo(models.User, { foreignKey: 'userId' });
    Chat.belongsTo(models.ChatGroup, { foreignKey: 'chatGroupId' });
  };
  return Chat;
};
