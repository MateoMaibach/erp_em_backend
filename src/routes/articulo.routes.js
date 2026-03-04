const express = require("express");
const router = express.Router();
const articuloController = require("../controllers/articulo.controller.js");
const authMiddleware = require("../middlewares/auth.middleware.js");
const { isAdmin } = require("../middlewares/role.middleware.js");

router.get("/", authMiddleware, articuloController.getArticulos);
router.post("/", authMiddleware, isAdmin, articuloController.createArticulo);
router.put("/:id", authMiddleware, isAdmin, articuloController.updateArticulo);
router.delete("/:id", authMiddleware, isAdmin, articuloController.deleteArticulo);

module.exports = router;