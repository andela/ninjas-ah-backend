export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM('normal', 'admin'),
      allowNull: false,
      defaultValue: 'normal',
    },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    newUser: {
      firstName: 'John',
      lastName: 'Smith',
      username: 'josmi',
      email: 'luctunechi45@gmail.com',
      password: 'Baaa1234!'
    }
  });
  User.associate = (models) => {
    User.hasMany(models.Article, { foreignKey: 'userId', onUpdate: 'CASCADE', onDelete: 'CASCADE' });
    User.hasMany(models.Comment, { foreignKey: 'userId', onUpdate: 'CASCADE', onDelete: 'CASCADE' });
  };

  return User;
};
