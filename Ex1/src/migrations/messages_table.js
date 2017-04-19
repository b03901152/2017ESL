module.exports = {
  up( queryInterface, Sequelize ) {
    return queryInterface.createTable( 'Message', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      senderUserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      recipientGroupId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      text: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      read: {
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
    return queryInterface.dropTable( 'Message' );
  },
};
