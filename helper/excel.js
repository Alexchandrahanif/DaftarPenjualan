const ExcelJS = require("exceljs");

const exportToExcel = async (dataDaftarPenjualan, res) => {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Daftar Penjualan");

    worksheet.columns = [
      {
        header: "Nomor",
        key: "Nomor",
        width: 10,
        alignment: {
          horizontal: "center",
          vertical: "middle",
        },
        border: {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        },
      },
      {
        header: "Produk",
        key: "Produk",
        width: 25,
        alignment: {
          horizontal: "center",
          vertical: "middle",
        },
        border: {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        },
      },
      {
        header: "Plat",
        key: "Plat",
        width: 25,
        alignment: {
          horizontal: "center",
          vertical: "middle",
        },
        border: {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        },
      },
      {
        header: "Tanggal Penjualan",
        key: "Tanggal Penjualan",
        width: 25,
        alignment: {
          horizontal: "center",
          vertical: "middle",
        },
        border: {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        },
      },
    ];

    dataDaftarPenjualan.forEach((row, idx) => {
      const tanggalPenjualan = new Date(row.createdAt);
      const formattedTanggalPenjualan = `${tanggalPenjualan.toLocaleDateString(
        "id-ID",
        {
          weekday: "long",
        }
      )}, ${tanggalPenjualan.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })}`;

      worksheet.addRow({
        Nomor: idx + 1,
        Produk: row.produk,
        Plat: row.plat,
        "Tanggal Penjualan": formattedTanggalPenjualan,
      });
    });

    const excelFileName = "DaftarPenjualan.xlsx";

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment;filename=" + "DaftarPenjualan.xlsx"
    );

    await workbook.xlsx.write(res);

    res.status(200).end();
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { exportToExcel };
