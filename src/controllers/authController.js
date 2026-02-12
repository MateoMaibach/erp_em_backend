const Usuario = require("../models/Usuario");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const usuario = await Usuario.findOne({ where: { username } });

    if (usuario && (await usuario.validPassword(password))) {
      const token = jwt.sign(
        { id: usuario.id_usuario, rol: usuario.rol },
        process.env.JWT_SECRET,
        { expiresIn: "8h" },
      );
      res.json({ token, rol: usuario.rol });
    } else {
      res.status(401).json({ error: "Credenciales incorrectas" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
};

exports.registrar = async (req, res) => {
  try {
    const { username, password, rol } = req.body;
    const nuevoUsuario = await Usuario.create({ username, password, rol });
    res
      .status(201)
      .json({ mensaje: "Usuario creado", id: nuevoUsuario.id_usuario });
  } catch (error) {
    res.status(400).json({ error: "El usuario ya existe" });
  }
};

exports.updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, rol } = req.body;

    const usuario = await Usuario.findByPk(id);
    if (!usuario)
      return res.status(404).json({ error: "Usuario no encontrado" });

    if (username) usuario.username = username;
    if (rol) usuario.rol = rol;
    if (password) usuario.password = password;

    await usuario.save();
    res.json({ mensaje: "Usuario actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar" });
  }
};

exports.deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const adminId = req.user.id;

    if (parseInt(id) === adminId) {
      return res
        .status(400)
        .json({ error: "No puedes eliminar tu propia cuenta" });
    }

    const usuario = await Usuario.findByPk(id);
    if (!usuario)
      return res.status(404).json({ error: "Usuario no encontrado" });

    await usuario.destroy();
    res.json({ mensaje: "Usuario eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
};
