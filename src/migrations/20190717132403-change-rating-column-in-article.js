export default {
  up: queryInterface => queryInterface.changeColumn('Articles', 'rating', {
    type: 'float USING CAST("rating" AS float)',
    allowNull: false,
    defaultValue: 0
  }),
  down: (queryInterface, Sequelize) => queryInterface.changeColumn('Articles', 'rating', {
    type: Sequelize.INTEGER,
    allowNull: true
  })
};
