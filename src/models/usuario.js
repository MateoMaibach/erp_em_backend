const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const bcrypt = require("bcryptjs");

const Usuario = sequelize.define(
  "Usuario",
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuario: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    contraseña: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rol: {
      type: DataTypes.ENUM("admin", "vendedor"),
      defaultValue: "vendedor",
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "usuarios",
    timestamps: false,
    hooks: {
      beforeCreate: async (user) => {
        user.contraseña = await bcrypt.hash(user.contraseña, 10);
      },
      beforeUpdate: async (user) => {
        if (user.changed("contraseña")) {
          user.contraseña = await bcrypt.hash(user.contraseña, 10);
        }
      },
    },
  },
);

Usuario.prototype.validPassword = async function (passwordPlano) {
  return await bcrypt.compare(passwordPlano, this.contraseña);
};

module.exports = Usuario;
