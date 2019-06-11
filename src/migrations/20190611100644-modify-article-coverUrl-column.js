export default {
  up: (queryInterface, Sequelize) => queryInterface.changeColumn('Articles', 'coverUrl', {
    type: Sequelize.TEXT,
    allowNull: true
  }),
  down: (queryInterface, Sequelize) => queryInterface.changeColumn('Articles', 'coverUrl', {
    type: Sequelize.TEXT,
    allowNull: false
  })
};
