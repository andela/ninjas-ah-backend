module.exports = (sequelize, DataTypes) => {
  const Highlight = sequelize.define(
    'Highlight',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      articleSlug: {
        type: DataTypes.STRING,
        allowNull: false
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
      highlightedText: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'highlightedText'
      },
      startIndex: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'startIndex'
      },
      stopIndex: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'stopIndex'
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      anchorKey: {
        type: DataTypes.STRING,
        allowNull: true
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
  Highlight.associate = (models) => {
    Highlight.belongsTo(models.User, { foreignKey: 'userId', as: 'commentAuthor' });
  };
  return Highlight;
};
