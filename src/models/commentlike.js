export default (sequelize, DataTypes) => {
  const CommentLike = sequelize.define(
    'CommentLike',
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
      commentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Comments',
          key: 'id'
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
  CommentLike.associate = (models) => {
    CommentLike.belongsTo(models.Comment, { foreignKey: 'commentId', as: 'comment' });
    CommentLike.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    models.User.belongsToMany(models.Comment, {
      through: models.CommentLike,
      foreignKey: 'userId',
      otherKey: 'commentId'
    });
    models.Comment.belongsToMany(models.User, {
      through: models.CommentLike,
      foreignKey: 'commentId',
      otherKey: 'userId'
    });
  };
  return CommentLike;
};
