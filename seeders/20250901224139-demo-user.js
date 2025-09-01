"use strict";

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        username: "admin",
        email: "admin@example.com",
        password: "123456",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "test",
        email: "test@example.com",
        password: "654321",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  }
};
