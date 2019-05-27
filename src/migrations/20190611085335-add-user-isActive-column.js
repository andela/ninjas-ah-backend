export default {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Users', 'isActive', {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }),
  down: queryInterface => queryInterface.removeColumn('Users', 'isActive')
};
