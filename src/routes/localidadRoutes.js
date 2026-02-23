const express = require("express");
const router = express.Router();
const localidadController = require("../controllers/localidadController");
const authMiddleware = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/roleMiddleware");

// --- RUTAS DE LOCALIDADES ---

// Todos los usuarios logueados pueden ver y BUSCAR localidades
router.get("/", authMiddleware, localidadController.getLocalidades);

// Todos los usuarios logueados pueden CREAR o EDITAR (por si falta alguna)
router.post("/", authMiddleware, localidadController.createLocalidad);
router.put("/:id", authMiddleware, localidadController.updateLocalidad);

// SOLO EL ADMIN puede borrar una localidad de la base de datos
router.delete("/:id", authMiddleware, isAdmin, localidadController.deleteLocalidad);

module.exports = router;