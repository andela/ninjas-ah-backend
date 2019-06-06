export default {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Articles', 'likes', {
    type: Sequelize.INTEGER,
    allowNull: true
  }),
  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Articles', 'likes', {
    type: Sequelize.INTEGER,
    allowNull: true
  })
};
