const express = require("express");
const router = express.Router();
const proveedorController = require("../controllers/proveedor.controllers.js");
const authMiddleware = require("../middlewares/auth.middleware.js");
const { isAdmin } = require("../middlewares/role.middleware.js");

router.get("/", authMiddleware, proveedorController.getProveedores);

router.post("/", authMiddleware, isAdmin, proveedorController.createProveedor);
router.put(
  "/:id",
  authMiddleware,
  isAdmin,
  proveedorController.updateProveedor,
);
router.delete(
  "/:id",
  authMiddleware,
  isAdmin,
  proveedorController.deleteProveedor,
);

module.exports = router;
