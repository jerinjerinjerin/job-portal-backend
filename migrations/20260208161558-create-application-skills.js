"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("application_skills", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },

      applicationId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "applications",
          key: "id",
        },
        onDelete: "CASCADE",
      },

      skillId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "skills",
          key: "id",
        },
        onDelete: "CASCADE",
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

    await queryInterface.addConstraint("application_skills", {
      fields: ["applicationId", "skillId"],
      type: "unique",
      name: "unique_application_skill",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("application_skills");
  },
};
