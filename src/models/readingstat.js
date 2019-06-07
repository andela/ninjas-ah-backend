module.exports = (sequelize, DataTypes) => {
  const ReadingStat = sequelize.define(
    'ReadingStat',
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
      articleSlug: {
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
  ReadingStat.associate = (models) => {
    ReadingStat.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
    ReadingStat.belongsTo(models.Article, {
      foreignKey: 'articleSlug',
      as: 'article'
    });
  };
  return ReadingStat;
};
