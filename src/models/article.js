import eventEmitter from '../helpers/eventEmitter';

export default (sequelize, DataTypes) => {
  const Article = sequelize.define(
    'Article',
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
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      tagList: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
      },
      status: {
        type: DataTypes.ENUM('draft', 'published', 'deleted'),
        allowNull: false,
        defaultValue: 'draft'
      },
      readTime: {
        type: DataTypes.STRING,
        allowNull: true
      },
      coverUrl: {
        type: DataTypes.STRING,
        allowNull: true
      },
      favorited: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      favoritesCount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      likes: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      dislikes: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
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
    {
      hooks: {
        afterUpdate: async (article) => {
          const currentData = article.get();
          const previousData = article.previous();

          if (previousData && previousData.status) {
            if (previousData.status === 'draft' && currentData.status === 'published') {
              eventEmitter.emit('publishArticle', currentData.userId, currentData.slug);
            }
          }
        }
      }
    }
  );
  Article.associate = (models) => {
    Article.belongsTo(models.User, { foreignKey: 'userId', as: 'author' });
  };
  return Article;
};
