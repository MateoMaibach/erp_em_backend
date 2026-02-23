exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.rol === "admin") {
    next();
  } else {
    res
      .status(403)
      .json({
        error: "Acceso denegado: se requieren permisos de administrador",
      });
  }
};
