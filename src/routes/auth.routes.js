const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/role.middleware");

router.post("/login", authController.login);

router.get("/users", authMiddleware, isAdmin, authController.getAllUsuarios);
router.post("/register", authMiddleware, isAdmin, authController.registrar);

router.put("/:id", authMiddleware, isAdmin, authController.updateUsuario);

router.delete("/:id", authMiddleware, isAdmin, authController.deleteUsuario);

module.exports = router;
