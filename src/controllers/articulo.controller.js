const { Articulo, Proveedor } = require("../models/index");
const { Op } = require("sequelize");

exports.getArticulos = async (req, res) => {
  try {
    const { categoria, nombre } = req.query;
    let where = {};

    if (categoria) where.categoria = categoria;
    if (nombre) where.nombre_articulo = { [Op.like]: `%${nombre}%` };

    const articulos = await Articulo.findAll({
      where,
      include: [
        {
          model: Proveedor,
          as: "proveedor",
          attributes: ["nombre_proveedor"],
        },
      ],
    });

    const articulosConMargen = articulos.map((art) => {
      const articulo = art.toJSON();
      const precio = parseFloat(articulo.precio_lista);
      const costo = parseFloat(articulo.costo_base_admin);

      const margenDinero = precio - costo;
      const margenPorcentaje = costo > 0 ? (margenDinero / costo) * 100 : 0;

      return {
        ...articulo,
        rentabilidad_dinero: margenDinero.toFixed(2),
        rentabilidad_porcentaje: `${margenPorcentaje.toFixed(2)}%`,
      };
    });

    res.json(articulosConMargen);
  } catch (error) {
    console.error("ERROR EN GET ARTICULOS:", error);
    res.status(500).json({ error: "Error al obtener artículos" });
  }
};

exports.createArticulo = async (req, res) => {
  try {
    const nuevo = await Articulo.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res
      .status(400)
      .json({
        error: "Error al crear artículo. Verifique que el SKU sea único.",
      });
  }
};

exports.updateArticulo = async (req, res) => {
  try {
    const { id } = req.params;
    const articulo = await Articulo.findByPk(id);
    if (!articulo) return res.status(404).json({ error: "No encontrado" });

    await articulo.update(req.body);
    res.json({ mensaje: "Actualizado", articulo });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar" });
  }
};

exports.deleteArticulo = async (req, res) => {
  try {
    const { id } = req.params;
    await Articulo.destroy({ where: { id_articulo: id } });
    res.json({ mensaje: "Artículo eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar" });
  }
};
