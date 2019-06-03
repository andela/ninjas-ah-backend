export default (sequelize, DataTypes) => {
  const CommentEdit = sequelize.define(
    'CommentEdit',
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
      commentId: {
        allowNull: null,
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
    {}
  );
  CommentEdit.associate = (models) => {
    CommentEdit.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    CommentEdit.belongsTo(models.Article, { foreignKey: 'articleSlug', as: 'article' });
    CommentEdit.belongsTo(models.Comment, { foreignKey: 'commentId', as: 'comment' });
  };
  return CommentEdit;
};
