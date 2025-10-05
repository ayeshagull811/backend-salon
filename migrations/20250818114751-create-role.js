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
        allowNull: false,   // ✅ null nahi hoga
        // ❌ yahan unique hatao
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // 👇 Composite unique constraint add karo
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
