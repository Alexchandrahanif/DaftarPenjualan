require("dotenv").config();
require("dotenv").config({ path: `.env.local`, override: true });

const router = require("./routes");
const handleError = require("./middleware/handleError");

const { Sequelize } = require("sequelize");

let sequelize;

if (process.env.NODE_ENV === "production") {
  sequelize = new Sequelize(process.env.POSTGRES_URL, {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Jika Anda ingin mematikan validasi sertifikat (dalam pengembangan)
      },
    },
  });
} else {
  const config = require("./config/config.json")[process.env.NODE_ENV];
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
  });
}

const cors = require("cors");
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);
app.use(handleError);

app.listen(port, () => {
  console.log(`DAFTAR PENJUALAN SERVER CONNECTED!`);
});
