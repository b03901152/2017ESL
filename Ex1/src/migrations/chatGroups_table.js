module.exports = {
  up( queryInterface, Sequelize ) {
    return queryInterface.createTable( 'ChatGroup', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      groupName: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    } );
  },

  down( queryInterface ) {
    return queryInterface.dropTable( 'ChatGroup' );
  },
};
