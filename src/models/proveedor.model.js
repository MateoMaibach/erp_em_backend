const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Proveedor = sequelize.define('Proveedor', {
    id_proveedor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_proveedor: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    contacto: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    direccion: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    id_localidad: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'proveedores',
    timestamps: false
});

module.exports = Proveedor;