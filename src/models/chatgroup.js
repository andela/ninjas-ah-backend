module.exports = (sequelize, DataTypes) => {
  const ChatGroup = sequelize.define(
    'ChatGroup',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
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
  ChatGroup.associate = (models) => {
    ChatGroup.hasMany(models.Chat, {
      foreignKey: 'chatGroupId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };
  return ChatGroup;
};
