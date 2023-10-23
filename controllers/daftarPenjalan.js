const { Op } = require("sequelize");
const { DaftarPenjualan, Sequelize } = require("../models");
const moment = require("moment");
const { exportToExcel } = require("../helper/excel");

class Controller {
  // GET ALL
  static async getAllDaftarPenjualan(req, res, next) {
    try {
      const { limit, page, search, tanggal, exportExcel, awal, akhir } =
        req.query;

      let pagination = {
        limit: limit ? limit : 50,
        order: [["createdAt", "DESC"]],
        where: {},
      };

      if (page) {
        pagination.offset = (page - 1) * (limit ? limit : 50);
      }

      if (awal && akhir) {
        const startDate = moment(awal, "YYYY-MM-DD").startOf("day").format();
        const endDate = moment(akhir, "YYYY-MM-DD").endOf("day").format();

        pagination.where.createdAt = {
          [Op.between]: [startDate, endDate],
        };
      } else if (tanggal) {
        const pagi = moment().format(`${tanggal} 00:00`);
        const masuk = moment().format(`${tanggal} 23:59`);
        pagination.where.createdAt = {
          [Op.between]: [pagi, masuk],
        };
      }

      if (search) {
        pagination.where.produk = {
          [Op.iLike]: `%${search}%`,
        };
      }

      if (exportExcel) {
        let dataDaftarPenjualan = await DaftarPenjualan.findAll(pagination);

        exportToExcel(dataDaftarPenjualan, res);
      } else {
        let dataDaftarPenjualan = await DaftarPenjualan.findAndCountAll(
          pagination
        );

        let totalPage = Math.ceil(
          dataDaftarPenjualan.count / (limit ? limit : 50)
        );

        res.status(200).json({
          statusCode: 200,
          message: "Berhasil Mendapatkan Semua Data Daftar Penjualan",
          data: dataDaftarPenjualan.rows,
          totaldataDaftarPenjualan: dataDaftarPenjualan.count,
          totalPage: totalPage,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  // GET ONE
  static async getOneDaftarPenjualan(req, res, next) {
    try {
      const { id } = req.params;
      const data = await DaftarPenjualan.findOne({
        where: {
          id,
        },
      });

      if (!data) {
        throw { name: "Id Daftar Penjualan Tidak Ditemukan" };
      }

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Data Daftar Penjualan",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  }

  // CREATE
  static async createDaftarPenjualan(req, res, next) {
    try {
      const { produk, plat } = req.body;

      const dataDaftarPenjualan = await DaftarPenjualan.create({
        produk,
        plat,
      });

      res.status(201).json({
        statusCode: 201,
        message: "Berhasil Membuat Data Daftar Penjualan Baru",
        data: dataDaftarPenjualan,
      });
    } catch (error) {
      next(error);
    }
  }

  // UPDATE
  static async updateDaftarPenjualan(req, res, next) {
    try {
      const { id } = req.params;
      const { produk, plat } = req.body;
      const data = await DaftarPenjualan.findOne({
        where: {
          id,
        },
      });

      if (!data) {
        throw { name: "Id Daftar Penjualan Tidak Ditemukan" };
      }

      await DaftarPenjualan.update(
        {
          produk,
          plat,
        },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Memperbaharui Data Daftar Penjualan",
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE
  static async deleteDaftarPenjualan(req, res, next) {
    try {
      const { id } = req.params;
      const data = await DaftarPenjualan.findOne({
        where: {
          id,
        },
      });

      if (!data) {
        throw { name: "Id Daftar Penjualan Tidak Ditemukan" };
      }

      await DaftarPenjualan.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menghapus Data Daftar Penjualan",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
