export default {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.changeColumn('Users', 'permissions', {
      type: Sequelize.STRING,
      allowNull: true
    })
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.changeColumn('Users', 'permissions', {
      type: Sequelize.STRING,
      allowNull: true
    })
  ])
};
