import eventEmitter from '../helpers/eventEmitter';

export default (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      articleSlug: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'Articles',
          key: 'slug'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
      body: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      likes: {
        allowNull: true,
        type: DataTypes.INTEGER
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
        afterCreate: async (comment) => {
          eventEmitter.emit('commentArticle', comment.get());
        }
      }
    }
  );
  Comment.associate = (models) => {
    Comment.belongsTo(models.Article, { foreignKey: 'articleSlug' });
    Comment.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Comment;
};
