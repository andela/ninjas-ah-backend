export default {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('Notifications', 'url', {
      type: Sequelize.STRING,
      allowNull: true
    })
  ]),
  down: queryInterface => Promise.all([queryInterface.removeColumn('Notifications', 'url')])
};
