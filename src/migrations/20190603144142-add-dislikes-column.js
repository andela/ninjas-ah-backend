export default {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Articles', 'dislikes', {
    type: Sequelize.INTEGER,
    allowNull: true
  }),
  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Articles', 'dislikes', {
    type: Sequelize.INTEGER,
    allowNull: true
  })
};
