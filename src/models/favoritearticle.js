export default (sequelize, DataTypes) => {
  const FavoriteArticle = sequelize.define(
    'FavoriteArticle',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      articleSlug: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
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
  FavoriteArticle.associate = (models) => {
    FavoriteArticle.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return FavoriteArticle;
};
