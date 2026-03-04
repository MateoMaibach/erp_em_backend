const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Deposito = sequelize.define('Deposito', {
    id_deposito: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_deposito: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    ubicacion: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    es_activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'depositos',
    timestamps: false 
});

module.exports = Deposito;