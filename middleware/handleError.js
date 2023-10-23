const handleError = (err, req, res, next) => {
  console.log(err);
  let code = 500;
  let message = "Internal Server Error";

  if (
    err.name === "SequelizeValidationError" ||
    err.name == "SequelizeUniqueConstraintError"
  ) {
    code = 400;
    message = [];
    err.errors.forEach((el) => {
      message.push(el.message);
    });
  } else if (err.name === "Id Daftar Penjualan Tidak Ditemukan") {
    code = 404;
    message = "Id Daftar Penjualan Tidak Ditemukan";
  }
  res.status(code).json({
    statusCode: code,
    message: message,
  });
};

module.exports = handleError;
