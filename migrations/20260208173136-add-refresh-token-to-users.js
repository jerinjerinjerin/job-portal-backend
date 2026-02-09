"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "users",
      "refreshToken",
      {
        type: Sequelize.TEXT,
        allowNull: true,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      "users",
      "refreshToken"
    );
  },
};
