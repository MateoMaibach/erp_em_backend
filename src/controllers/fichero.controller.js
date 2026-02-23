const { Op } = require("sequelize");
const { FicheroCliente, Localidad, Usuario } = require("../models/index");

exports.getFicheros = async (req, res) => {
  try {
    const { nombre, apellido, localidad } = req.query;
    let whereClause = {};

    if (nombre) {
      whereClause.nombre_cliente = { [Op.like]: `%${nombre}%` };
    }

    if (apellido) {
      whereClause.apellido_cliente = { [Op.like]: `%${apellido}%` };
    }

    let localidadWhere = {};
    if (localidad) {
      localidadWhere.nombre_localidad = { [Op.like]: `%${localidad}%` };
    }

    const ficheros = await FicheroCliente.findAll({
      where: whereClause,
      include: [
        {
          model: Localidad,
          as: "localidad",
          attributes: ["nombre_localidad", "provincia"],
          where: localidad ? localidadWhere : null,
        },
        {
          model: Usuario,
          as: "vendedor",
          attributes: ["id_usuario", "usuario", "rol"],
        },
      ],
    });

    res.json(ficheros);
  } catch (error) {
    console.error("Error en GET Ficheros con filtros:", error);
    res.status(500).json({ error: "Error al obtener los datos filtrados" });
  }
};

exports.createFichero = async (req, res) => {
  try {
    const nuevoFichero = await FicheroCliente.create(req.body);
    res
      .status(201)
      .json({ mensaje: "Fichero creado", id: nuevoFichero.id_fichero });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ error: "Error al crear: Verifique datos obligatorios" });
  }
};

exports.updateFichero = async (req, res) => {
  try {
    const { id } = req.params;
    const fichero = await FicheroCliente.findByPk(id);

    if (!fichero) {
      return res.status(404).json({ error: "Fichero no encontrado" });
    }

    if (req.user.rol !== "admin" && fichero.id_vendedor !== req.user.id) {
      return res
        .status(403)
        .json({ error: "No tienes permiso para editar este fichero" });
    }

    await fichero.update(req.body);
    res.json({ mensaje: "Fichero actualizado con éxito", fichero });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el fichero" });
  }
};

exports.deleteFichero = async (req, res) => {
  try {
    const { id } = req.params;
    const fichero = await FicheroCliente.findByPk(id);
    if (!fichero) return res.status(404).json({ error: "No encontrado" });

    await fichero.destroy();
    res.json({ mensaje: "Fichero eliminado físicamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar" });
  }
};
