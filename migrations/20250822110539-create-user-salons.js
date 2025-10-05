
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserSalons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      salonId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Salons",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
roleId: {  
  type: Sequelize.INTEGER,
  allowNull: true,
  references: {
    model: "Roles",
    key: "id"
  },
  onDelete: "SET NULL",   // keep UserSalon row but nullify role
  onUpdate: "CASCADE"
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserSalons');
  }
};
