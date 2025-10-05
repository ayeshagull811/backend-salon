"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Roles",
      [
        {
          name: "owner",
          salonId: null, // 👈 important
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { ignoreDuplicates: true } // 👈 prevent duplicate error
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Roles", { name: "owner" }, {});
  },
};
