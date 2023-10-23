const daftarPenjualanRouter = require("./daftarPenjualan");

const router = require("express").Router();

router.use("/daftarPenjualan", daftarPenjualanRouter);

module.exports = router;
