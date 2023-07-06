'use strict';

const sequelize = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable("students", {
        studentId: {
          type: sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
          unique: true,
        },
        name: {
          type: sequelize.STRING,
          allowNull: false
        },
        dob: {
          type: sequelize.DATEONLY,
          allowNull: false
        },
        gender: {
          type: sequelize.STRING,
          allowNull: false
        },
        email: {
          type: sequelize.STRING,
          unique: true,
          allowNull: false
        },
        phoneNumber: {
          type: sequelize.STRING,
          unique: true,
          allowNull: false,
        },
        address: {
          type: sequelize.STRING,
          allowNull: false,
        },
        description: {
          type: sequelize.STRING,
          allowNull: true
        },
        createdBy: {
          type: sequelize.UUID,
          allowNull: true,
        },
        createdAt: {
          type: sequelize.DATE,
          allowNull: false,
        },
        updatedBy: {
          type: sequelize.UUID,
          allowNull: true,
        },
        updatedAt: {
          type: sequelize.DATE,
          allowNull: true
        },
        deletedBy: {
          type: sequelize.UUID,
          allowNull: true,
        },
        deletedAt: {
          type: sequelize.DATE,
          allowNull: true,
        },
      });
      console.log("Migration run successfully (students).")

    } catch (error) {
      console.error("Error in running migrations (students)", error)
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("students");
  }
};
