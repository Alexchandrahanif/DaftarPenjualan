const Controller = require("../controllers/daftarPenjalan");

const daftarPenjualanRouter = require("express").Router();

daftarPenjualanRouter.get("/", Controller.getAllDaftarPenjualan);
daftarPenjualanRouter.get("/:id", Controller.getOneDaftarPenjualan);
daftarPenjualanRouter.post("/", Controller.createDaftarPenjualan);
daftarPenjualanRouter.patch("/:id", Controller.updateDaftarPenjualan);
daftarPenjualanRouter.delete("/:id", Controller.deleteDaftarPenjualan);

module.exports = daftarPenjualanRouter;
