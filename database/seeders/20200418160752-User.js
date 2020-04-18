'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert(
        "Users",
        [
          {
            name: "Finn the Human",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "Jake the Dog",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );

  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('People', null, {}),
};
