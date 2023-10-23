"use strict";

const dataDaftarPenjualan = require("../data/daftarPenjualan.json");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // dataDaftarPenjualan.forEach((el) => {
    //   el.createdAt = el.updatedAt = new Date();
    // });
    await queryInterface.bulkInsert(
      "DaftarPenjualans",
      dataDaftarPenjualan,
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("DaftarPenjualans", null);
  },
};
