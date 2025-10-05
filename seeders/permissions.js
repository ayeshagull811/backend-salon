// seeders/XXXX-create-permissions.js
"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Permissions", [
     { name: "create_salon", createdAt: new Date(), updatedAt: new Date() },
      { name: "update_salon", createdAt: new Date(), updatedAt: new Date() },
      { name: "delete_salon", createdAt: new Date(), updatedAt: new Date() },
      { name: "view_salon", createdAt: new Date(), updatedAt: new Date() },

      // Staff permissions
      { name: "create_staff", createdAt: new Date(), updatedAt: new Date() },
      { name: "update_staff", createdAt: new Date(), updatedAt: new Date() },
      { name: "delete_staff", createdAt: new Date(), updatedAt: new Date() },
      { name: "view_staff", createdAt: new Date(), updatedAt: new Date() },

      // Service permissions
      { name: "create_service", createdAt: new Date(), updatedAt: new Date() },
      { name: "update_service", createdAt: new Date(), updatedAt: new Date() },
      { name: "delete_service", createdAt: new Date(), updatedAt: new Date() },
      { name: "view_service", createdAt: new Date(), updatedAt: new Date() },

      // Category permissions
      { name: "create_category", createdAt: new Date(), updatedAt: new Date() },
      { name: "update_category", createdAt: new Date(), updatedAt: new Date() },
      { name: "delete_category", createdAt: new Date(), updatedAt: new Date() },
      { name: "view_category", createdAt: new Date(), updatedAt: new Date() },

      // Schedule permissions
      { name: "create_schedule", createdAt: new Date(), updatedAt: new Date() },
      { name: "update_schedule", createdAt: new Date(), updatedAt: new Date() },
      { name: "delete_schedule", createdAt: new Date(), updatedAt: new Date() },
      { name: "view_schedule", createdAt: new Date(), updatedAt: new Date() },

      // Appointment permissions
      {
        name: "create_appointment",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "update_appointment",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "delete_appointment",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "view_appointment",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Billing permissions
      { name: "create_billing", createdAt: new Date(), updatedAt: new Date() },
      { name: "update_billing", createdAt: new Date(), updatedAt: new Date() },
      { name: "delete_billing", createdAt: new Date(), updatedAt: new Date() },
      { name: "view_billing", createdAt: new Date(), updatedAt: new Date() },

      // Admin special permissions
      { name: "assign_roles", createdAt: new Date(), updatedAt: new Date() },
      {
        name: "manage_all_salons",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "view_all_reports",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Permissions", null, {});
  },
};
