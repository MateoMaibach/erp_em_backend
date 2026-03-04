const { Deposito } = require("../models/index");

exports.getDepositos = async (req, res) => {
  try {
    const { todos } = req.query;
    const whereClause = todos === "true" ? {} : { es_activo: true };

    const depositos = await Deposito.findAll({ where: whereClause });
    res.json(depositos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener depósitos" });
  }
};

exports.createDeposito = async (req, res) => {
  try {
    const nuevo = await Deposito.create(req.body);
    res.status(201).json({ mensaje: "Depósito creado", deposito: nuevo });
  } catch (error) {
    res.status(400).json({ error: "Error al crear el depósito" });
  }
};

exports.updateDeposito = async (req, res) => {
  try {
    const { id } = req.params;
    const deposito = await Deposito.findByPk(id);
    if (!deposito) return res.status(404).json({ error: "No encontrado" });

    await deposito.update(req.body);
    res.json({ mensaje: "Depósito actualizado", deposito });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar" });
  }
};

exports.deleteDeposito = async (req, res) => {
  try {
    const { id } = req.params;

    await Deposito.update({ es_activo: false }, { where: { id_deposito: id } });
    res.json({ mensaje: "Depósito desactivado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar" });
  }
};
