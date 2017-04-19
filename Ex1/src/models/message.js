module.exports = ( sequelize, DataTypes ) => {
  const Message = sequelize.define( 'Message', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    senderUserId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    recipientGroupId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    text: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    read: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, { freezeTableName: true } );

  return Message;
};
