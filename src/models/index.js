const Usuario = require("./Usuario");
const Localidad = require("./Localidad");
const FicheroCliente = require("./FicheroCliente");
const Proveedor = require("./proveedor.model");
const Articulo = require("./articulo.model");
const Deposito = require("./deposito.model");

Articulo.belongsTo(Proveedor, { foreignKey: "id_proveedor", as: "proveedor" });
Proveedor.hasMany(Articulo, { foreignKey: "id_proveedor" });

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

Proveedor.belongsTo(Localidad, {
  foreignKey: "id_localidad",
  as: "localidad",
});
Localidad.hasMany(Proveedor, { foreignKey: "id_localidad" });

module.exports = {
  Usuario,
  Localidad,
  FicheroCliente,
  Proveedor,
  Articulo,
  Deposito
};
