const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Articulo = sequelize.define('Articulo', {
    id_articulo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sku: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    nombre_articulo: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    id_proveedor: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    categoria: {
        type: DataTypes.ENUM('piscina', 'filtrado', 'placas', 'plomeria', 'insumos', 'accesorios'),
        allowNull: false
    },
    
    largo: DataTypes.DECIMAL(10, 2),
    ancho: DataTypes.DECIMAL(10, 2),
    profundidad_min: DataTypes.DECIMAL(10, 2),
    profundidad_max: DataTypes.DECIMAL(10, 2),
    diametro: DataTypes.STRING(50),
    peso_kg: DataTypes.DECIMAL(10, 2),
   
    precio_lista: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false
    },
    costo_base_admin: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false
    }
}, {
    tableName: 'articulos',
    timestamps: false 
});

module.exports = Articulo;