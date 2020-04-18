'use strict';

module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    recipientId: DataTypes.INTEGER,
    senderId: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {});

  Message.associate = function(models) {
    Message.belongsTo(models.User, {
      foreignKey: 'recipientId',
      as: 'recipient',
      onDelete: 'CASCADE'
    })

    Message.belongsTo(models.User, {
      foreignKey: 'senderId',
      as: 'sender',
    })
  };

  return Message;
};