const { Localidad } = require("../models/index");
const { Op } = require("sequelize");

exports.getLocalidades = async (req, res) => {
  try {
    const { nombre } = req.query;
    let whereClause = {};

    if (nombre) {
      whereClause = {
        nombre_localidad: { [Op.like]: `%${nombre}%` },
      };
    }

    const localidades = await Localidad.findAll({
      where: whereClause,
      limit: 50,
    });
    res.json(localidades);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener localidades" });
  }
};

exports.createLocalidad = async (req, res) => {
  try {
    const nueva = await Localidad.create(req.body);
    res.status(201).json({ mensaje: "Localidad creada", localidad: nueva });
  } catch (error) {
    res.status(400).json({ error: "Error al crear localidad" });
  }
};

exports.updateLocalidad = async (req, res) => {
  try {
    const { id } = req.params;
    const localidad = await Localidad.findByPk(id);
    if (!localidad) return res.status(404).json({ error: "No encontrada" });

    await localidad.update(req.body);
    res.json({ mensaje: "Localidad actualizada", localidad });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar" });
  }
};

exports.deleteLocalidad = async (req, res) => {
  try {
    const { id } = req.params;
    const localidad = await Localidad.findByPk(id);
    if (!localidad) return res.status(404).json({ error: "No encontrada" });

    await localidad.destroy();
    res.json({ mensaje: "Localidad eliminada" });
  } catch (error) {
    res.status(500).json({
      error:
        "No se puede eliminar la localidad porque tiene clientes asignados.",
    });
  }
};
