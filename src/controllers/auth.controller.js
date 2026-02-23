const Usuario = require("../models/Usuario");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { usuario, contraseña } = req.body;

    const userFound = await Usuario.findOne({ where: { usuario: usuario } });

    if (userFound && (await userFound.validPassword(contraseña))) {
      if (!userFound.activo) {
        return res
          .status(403)
          .json({ error: "Cuenta desactivada. Contacte al administrador." });
      }

      const token = jwt.sign(
        { id: userFound.id_usuario, rol: userFound.rol },
        process.env.JWT_SECRET,
        { expiresIn: "8h" },
      );

      res.json({ token, rol: userFound.rol });
    } else {
      res.status(401).json({ error: "Credenciales incorrectas" });
    }
  } catch (error) {
    console.error("Error en Login:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

exports.registrar = async (req, res) => {
  try {
    const { usuario, contraseña, rol } = req.body;

    const nuevoUsuario = await Usuario.create({
      usuario,
      contraseña,
      rol,
    });

    res.status(201).json({
      mensaje: "Usuario creado",
      id: nuevoUsuario.id_usuario,
    });
  } catch (error) {
    console.error("Error en Registro:", error);
    res.status(400).json({ error: "Error al crear usuario o ya existe" });
  }
};

exports.updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { usuario, contraseña, rol, activo } = req.body;

    const userInstance = await Usuario.findByPk(id);
    if (!userInstance)
      return res.status(404).json({ error: "Usuario no encontrado" });

    if (usuario) userInstance.usuario = usuario;
    if (rol) userInstance.rol = rol;
    if (contraseña) userInstance.contraseña = contraseña;
    if (activo !== undefined) userInstance.activo = activo;

    await userInstance.save();
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
        .json({ error: "No puedes desactivar tu propia cuenta" });
    }

    const userInstance = await Usuario.findByPk(id);
    if (!userInstance)
      return res.status(404).json({ error: "Usuario no encontrado" });

    userInstance.activo = false;
    await userInstance.save();

    res.json({ mensaje: "Usuario desactivado con éxito (Borrado lógico)" });
  } catch (error) {
    console.error("Error al desactivar:", error);
    res.status(500).json({ error: "Error al procesar la baja del usuario" });
  }
};

exports.getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: ['id_usuario', 'usuario', 'rol', 'activo']
    });

    res.json(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error al obtener la lista de usuarios" });
  }
};