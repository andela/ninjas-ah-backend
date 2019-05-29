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
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      highlightedText: {
        type: DataTypes.STRING,
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
        type: DataTypes.TEXT
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
    Highlight.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return Highlight;
};
