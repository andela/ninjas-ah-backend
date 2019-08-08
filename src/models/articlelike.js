export default (sequelize, DataTypes) => {
  const ArticleLike = sequelize.define(
    'ArticleLike',
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
        onDelete: 'SET NULL'
      },
      articleSlug: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'Articles',
          key: 'slug'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      status: {
        type: DataTypes.ENUM('dislike', 'like'),
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
  ArticleLike.associate = (models) => {
    ArticleLike.belongsTo(models.Article, {
      foreignKey: 'articleSlug',
      as: 'article'
    });
    ArticleLike.belongsTo(models.User, {
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
  return ArticleLike;
};
