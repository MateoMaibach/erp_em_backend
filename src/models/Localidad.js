const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Localidad = sequelize.define('Localidad', {
    id_localidad: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    nombre_localidad: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    provincia: {  
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: 'localidades',
    timestamps: false
});

module.exports = Localidad;