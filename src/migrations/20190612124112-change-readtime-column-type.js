export default {
  up: queryInterface => queryInterface.changeColumn('Articles', 'readTime', {
    type: 'integer USING CAST("readTime" AS integer)',
    allowNull: false,
    defaultValue: 0
  }),
  down: (queryInterface, Sequelize) => queryInterface.changeColumn('Articles', 'readTime', {
    type: Sequelize.STRING,
    allowNull: true
  })
};
