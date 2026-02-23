const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const FicheroCliente = sequelize.define(
  "FicheroCliente",
  {
    id_fichero: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_cliente: { type: DataTypes.STRING(100), allowNull: false },
    apellido_cliente: { type: DataTypes.STRING(100), allowNull: false },
    dni_cuit: { type: DataTypes.STRING(20), allowNull: false },
    id_localidad: { type: DataTypes.INTEGER, allowNull: false },
    direccion_obra: { type: DataTypes.STRING(255), allowNull: false },
    telefono_1: { type: DataTypes.STRING(20), allowNull: false },
    telefono_2: { type: DataTypes.STRING(20), allowNull: true },
    fecha_venta: { type: DataTypes.DATEONLY, allowNull: false },
    id_vendedor: { type: DataTypes.INTEGER, allowNull: false },

    comision_pactada_congelada: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
    },
    importe_total_venta: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
      defaultValue: 0.0,
    },
  },
  {
    tableName: "fichero_clientes",
    timestamps: false,
  },
);

module.exports = FicheroCliente;
