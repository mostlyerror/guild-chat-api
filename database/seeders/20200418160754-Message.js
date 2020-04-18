"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Messages",
      [
        {
          active: true,
          senderId: 1,
          recipientId: 2,
          content: "something Finn would say to Jake",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          active: true,
          senderId: 2,
          recipientId: 1,
          content: "something Jake would say to Finn",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("Messages", null, {}),
};
