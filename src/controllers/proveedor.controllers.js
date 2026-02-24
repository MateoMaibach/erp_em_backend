const { Proveedor, Localidad } = require("../models/index");
const { Op } = require("sequelize");

exports.getProveedores = async (req, res) => {
  try {
    const { nombre } = req.query;
    const whereClause = nombre
      ? { nombre_proveedor: { [Op.like]: `%${nombre}%` } }
      : {};

    const proveedores = await Proveedor.findAll({
      where: whereClause,
      include: [
        {
          model: Localidad,
          as: "localidad",
          attributes: ["nombre_localidad", "provincia"],
        },
      ],
    });
    res.json(proveedores);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener proveedores" });
  }
};

exports.createProveedor = async (req, res) => {
  try {
    const nuevoProveedor = await Proveedor.create(req.body);
    res.status(201).json({
      mensaje: "Proveedor creado con éxito",
      proveedor: nuevoProveedor,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Error al crear el proveedor" });
  }
};

exports.updateProveedor = async (req, res) => {
  try {
    const { id } = req.params;
    const proveedor = await Proveedor.findByPk(id);

    if (!proveedor)
      return res.status(404).json({ error: "Proveedor no encontrado" });

    await proveedor.update(req.body);
    res.json({ mensaje: "Proveedor actualizado", proveedor });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar proveedor" });
  }
};

exports.deleteProveedor = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Proveedor.destroy({ where: { id_proveedor: id } });

    if (result === 0)
      return res.status(404).json({ error: "Proveedor no encontrado" });

    res.json({ mensaje: "Proveedor eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar proveedor" });
  }
};
