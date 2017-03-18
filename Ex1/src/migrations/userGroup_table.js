module.exports = {
  up( queryInterface, Sequelize ) {
    return queryInterface.createTable( 'UserGroup', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      userID: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      groupID: {
        allowNull: false,
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
    return queryInterface.dropTable( 'UserGroup' );
  },
};
