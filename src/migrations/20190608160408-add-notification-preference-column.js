export default {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Notifications_preference"'),
    queryInterface.addColumn('Notifications', 'preference', {
      type: Sequelize.ENUM('inApp', 'email'),
      allowNull: false,
      defaultValue: 'inApp'
    })
  ]),
  down: queryInterface => Promise.all([
    queryInterface.removeColumn('Notifications', 'preference'),
    queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Notifications_preference"')
  ])
};
