const express = require("express");
const router = express.Router();
const localidadController = require("../controllers/localidad.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/role.middleware");

router.get("/", authMiddleware, localidadController.getLocalidades);

router.post("/", authMiddleware, localidadController.createLocalidad);
router.put("/:id", authMiddleware, localidadController.updateLocalidad);

router.delete(
  "/:id",
  authMiddleware,
  isAdmin,
  localidadController.deleteLocalidad,
);

module.exports = router;
