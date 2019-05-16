export default (sequelize, DataTypes) => {
  const ReportArticle = sequelize.define(
    'ReportArticle',
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
        allowNull: false,
        references: {
          model: 'Articles',
          key: 'slug'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      reportTitle: {
        type: DataTypes.STRING,
        allowNull: false
      },
      reportBody: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      type: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
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
  ReportArticle.associate = (models) => {
    ReportArticle.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };
  return ReportArticle;
};
