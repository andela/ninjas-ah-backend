export default {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Articles', 'rating', {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0
  }),
  down: queryInterface => queryInterface.removeColumn('Articles', 'rating')
};
