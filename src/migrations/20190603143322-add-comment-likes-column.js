export default {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Comments', 'likes', {
    type: Sequelize.INTEGER,
    allowNull: true
  }),
  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Comments', 'likes', {
    type: Sequelize.INTEGER,
    allowNull: true
  })
};
