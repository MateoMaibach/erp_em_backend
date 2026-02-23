const express = require("express");
const router = express.Router();
const ficheroController = require("../controllers/ficheroController");
const authMiddleware = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/roleMiddleware");

// Protección global: hay que estar logueado
router.use(authMiddleware);

router.get("/", ficheroController.getFicheros);
router.post("/", ficheroController.createFichero);
router.put("/:id", ficheroController.updateFichero);
router.delete("/:id",isAdmin , ficheroController.deleteFichero);

module.exports = router;