'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING
  }, {});

  User.associate = function(models) {
    User.hasMany(models.Message, {
      foreignKey: 'recipientId',
      as: 'receivedMessages',
      onDelete: 'CASCADE',
    });

    User.hasMay(models.Message, {
      foreignKey: 'senderId',
      as: 'sentMessages',
    })
  };
  return User;
};