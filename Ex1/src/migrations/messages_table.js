module.exports = {
  up( queryInterface, Sequelize ) {
    return queryInterface.createTable( 'Message', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      text: {
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
    return queryInterface.dropTable( 'Message' );
  },
};
