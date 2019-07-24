export default (sequelize, DataTypes) => {
  const ArticleBookmark = sequelize.define(
    'ArticleBookmark',
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
  ArticleBookmark.associate = (models) => {
    ArticleBookmark.belongsTo(models.User, { foreignKey: 'userId' });
    ArticleBookmark.belongsTo(models.Article, {
      foreignKey: 'articleSlug',
      targetKey: 'slug',
      as: 'article'
    });
  };
  return ArticleBookmark;
};
