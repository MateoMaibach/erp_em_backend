const Usuario = require("./Usuario");
const Localidad = require("./Localidad");
const FicheroCliente = require("./FicheroCliente");

FicheroCliente.belongsTo(Localidad, {
  foreignKey: "id_localidad",
  as: "localidad",
});
Localidad.hasMany(FicheroCliente, { foreignKey: "id_localidad" });

FicheroCliente.belongsTo(Usuario, {
  foreignKey: "id_vendedor",
  as: "vendedor",
});
Usuario.hasMany(FicheroCliente, { foreignKey: "id_vendedor" });

module.exports = {
  Usuario,
  Localidad,
  FicheroCliente,
};
