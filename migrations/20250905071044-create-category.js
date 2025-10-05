"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Categories", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      color: {
        type: Sequelize.STRING(20),
        defaultValue: "#8B5CF6",
      },
      icon: {
        type: Sequelize.STRING(50),
        defaultValue: "Scissors",
      },
      service_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
  allowNull: false,
  type: Sequelize.DATE,
  defaultValue: Sequelize.fn('NOW')
},
updatedAt: {
  allowNull: false,
  type: Sequelize.DATE,
  defaultValue: Sequelize.fn('NOW')
},
      salonId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Salons", // table name
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Categories");
  },
};
