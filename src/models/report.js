export default (sequelize, DataTypes) => {
  const Report = sequelize.define(
    'Report',
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
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },

      body: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      type: {
        allowNull: true,
        type: DataTypes.ARRAY(DataTypes.STRING)
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
  Report.associate = (models) => {
    Report.belongsTo(models.User, { foreignKey: 'userId', as: 'reporter' });
    Report.belongsTo(models.Article, { foreignKey: 'articleSlug', as: 'article' });
  };
  return Report;
};
