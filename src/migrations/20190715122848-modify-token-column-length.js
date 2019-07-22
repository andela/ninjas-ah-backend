export default {
  up: (queryInterface, Sequelize) => queryInterface.changeColumn('Tokens', 'token', {
    type: Sequelize.TEXT,
    allowNull: false
  }),
  down: (queryInterface, Sequelize) => queryInterface.changeColumn('Tokens', 'token', {
    type: Sequelize.TEXT,
    allowNull: false
  })
};
