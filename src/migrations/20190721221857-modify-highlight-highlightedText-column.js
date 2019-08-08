export default {
  up: (queryInterface, Sequelize) => queryInterface.changeColumn('Highlights', 'highlightedText', {
    type: Sequelize.TEXT,
    allowNull: false
  }),
  down: (queryInterface, Sequelize) => queryInterface.changeColumn('Highlights', 'highlightedText', {
    type: Sequelize.TEXT,
    allowNull: false
  })
};
