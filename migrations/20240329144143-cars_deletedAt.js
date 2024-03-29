"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Cars", "deletedAt", {
      allowNull: true,
      type: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeColumn("Cars", "deletedAt");
  },
};
