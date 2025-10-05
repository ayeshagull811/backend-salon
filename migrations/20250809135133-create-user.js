"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstname: {
        type: Sequelize.STRING,
      },
      lastname: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      password_hash: {
        type: Sequelize.STRING,
      },
      confirmpassword: {
        type: Sequelize.STRING,
      },
      phonenumber: {
        type: Sequelize.STRING,
      },
      // role: {
      //   type: Sequelize.ENUM("owner"),
      //   defaultValue: "owner",
      // },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      address: {
        type: Sequelize.STRING,
      },
      position: {
        type: Sequelize.ENUM(
          "Hair Stylist",
          "Senior Hair Stylist",
          "Hair Colorist",
          "Barber",
          "Nail Technician",
          "Esthetician",
          "Makeup Artist",
          "Eyebrow Specialist",
          "Massage Therapist",
          "Receptionist",
          "Salon Manager",
          "Assistant"
        ),
        allowNull: false,
      },
      department: {
        type: Sequelize.ENUM(
          "Hair Department",
          "Nail Care",
          "Skin Care",
          "Makeup & Beauty",
          "Massage & Spa",
          "Front Desk",
          "Management"
        ),
        allowNull: false,
      },
      salary: {
        type: Sequelize.FLOAT,
      },

      startDate: {
        type: Sequelize.DATE,
      },
      experience: {
        type: Sequelize.INTEGER,
      },
      specialization: {
        type: Sequelize.ENUM(
          "Bridal Makeup",
          "Hair Cutting",
          "Hair Coloring",
          "Hair Styling",
          "Keratin Treatment",
          "Nail Art",
          "Gel Manicure",
          "Facial Treatment",
          "Eyebrow Threading",
          "Massage Therapy",
          "Waxing Services"
        ),
        allowNull: false,
      },
      certifications: {
        type: Sequelize.STRING,
      },

      notes: {
        type: Sequelize.TEXT,
      },
      mustChangePassword: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },

      gender: {
        type: Sequelize.ENUM("male", "female", "other"),
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};