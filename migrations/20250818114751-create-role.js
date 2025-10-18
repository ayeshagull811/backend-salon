'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Roles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      salonId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Salons",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      // ✅ Add this
      defaultPermissions: {
        type: Sequelize.JSON,
        allowNull: true, // owner ke liye default permissions yahan save karoge
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // ✅ Unique constraint for (name, salonId)
    await queryInterface.addConstraint("Roles", {
      fields: ["name", "salonId"],
      type: "unique",
      name: "unique_role_per_salon"
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Roles');
  }
};
