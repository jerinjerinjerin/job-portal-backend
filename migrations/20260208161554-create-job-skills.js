"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("job_skills", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
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

    await queryInterface.addConstraint("job_skills", {
      fields: ["jobId", "skillId"],
      type: "unique",
      name: "unique_job_skill",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("job_skills");
  },
};
