"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DaftarPenjualan extends Model {
    static associate(models) {}
  }
  DaftarPenjualan.init(
    {
      produk: DataTypes.STRING,
      plat: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "DaftarPenjualan",
    }
  );
  return DaftarPenjualan;
};
