const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: true,
    define: {
      timestamps: true,
      freezeTableName: true,
    },
  },
);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Sequelize: Conexión establecida con éxito.");
  } catch (error) {
    console.error("Sequelize: Error de conexión:", error);
  }
};

testConnection();

module.exports = sequelize;
