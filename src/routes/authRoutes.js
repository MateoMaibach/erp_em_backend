const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/roleMiddleware");

router.post("/login", authController.login);

// Rutas exclusivas para ADMIN
router.put("/:id", authMiddleware, isAdmin, authController.updateUsuario);
router.delete("/:id", authMiddleware, isAdmin, authController.deleteUsuario);
router.post("/register", authMiddleware, isAdmin, authController.registrar);

module.exports = router;
