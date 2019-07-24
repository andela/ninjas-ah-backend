export default {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Highlights', 'anchorKey', {
    type: Sequelize.STRING,
    allowNull: true
  }),
  down: queryInterface => queryInterface.removeColumn('Highlights', 'anchorKey')
};
