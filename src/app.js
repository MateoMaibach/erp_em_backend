const express = require("express");
const sequelize = require("./config/db");
require("dotenv").config();
const authRoutes = require("./routes/auth.routes.js");
const ficheroRoutes = require("./routes/fichero.routes.js");
const localidadRoutes = require("./routes/localidad.routes.js");
const proveedorRoutes = require("./routes/proveedor.routes.js");
const articuloRoutes = require ("./routes/articulo.routes.js")

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/ficheros", ficheroRoutes);
app.use("/api/localidades", localidadRoutes);
app.use("/api/proveedores", proveedorRoutes);
app.use("/api/articulos", articuloRoutes)

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Base de datos conectada.");

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("No se pudo iniciar el servidor:", error);
  }
}

startServer();
