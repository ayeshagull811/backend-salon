"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Get a salon id (assuming first salon exists)
    const [salons] = await queryInterface.sequelize.query(
      `SELECT id FROM Salons LIMIT 1;`
    );
    if (!salons.length) {
      throw new Error("No Salon found! Please seed Salon first.");
    }

    await queryInterface.bulkInsert(
      "Roles",
      [
        {
          name: "owner",
          salonId: salons[0].id, // 👈 attach salon
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { ignoreDuplicates: true }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Roles", { name: "owner" }, {});
  },
};
