"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("applications", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },

      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },

      jobId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "jobs",
          key: "id",
        },
        onDelete: "CASCADE",
      },

      status: {
        type: Sequelize.ENUM("pending", "accepted", "rejected"),
        defaultValue: "pending",
      },

      resumeUrl: {
        type: Sequelize.STRING,
      },

      coverLetter: {
        type: Sequelize.TEXT,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("applications");
  },
};
