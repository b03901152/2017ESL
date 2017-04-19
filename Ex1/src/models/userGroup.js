module.exports = ( sequelize, DataTypes ) => {
  const UserGroup = sequelize.define( 'UserGroup', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    userID: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    groupID: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastReadTime: {
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

  return UserGroup;
};
