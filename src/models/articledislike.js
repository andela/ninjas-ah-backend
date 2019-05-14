export default (sequelize, DataTypes) => {
  const ArticleDislike = sequelize.define(
    'ArticleDislike',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      articleSlug: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
          model: 'Articles',
          key: 'slug'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
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
  ArticleDislike.associate = (models) => {
    ArticleDislike.belongsTo(models.Article, {
      foreignKey: 'articleSlug',
      as: 'article'
    });
    ArticleDislike.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
    models.Article.belongsToMany(models.User, {
      through: models.CommentLike,
      foreignKey: 'articleSlug',
      otherKey: 'userId'
    });
    models.User.belongsToMany(models.Article, {
      through: models.CommentLike,
      foreignKey: 'userId',
      otherKey: 'articleSlug'
    });
  };
  return ArticleDislike;
};
