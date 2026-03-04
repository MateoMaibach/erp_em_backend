const express = require("express");
const router = express.Router();
const depositoController = require("../controllers/deposito.controller.js");
const authMiddleware = require("../middlewares/auth.middleware.js");
const { isAdmin } = require("../middlewares/role.middleware.js");

router.get("/", authMiddleware, depositoController.getDepositos);
router.post("/", authMiddleware, isAdmin, depositoController.createDeposito);
router.put("/:id", authMiddleware, isAdmin, depositoController.updateDeposito);
router.delete(
  "/:id",
  authMiddleware,
  isAdmin,
  depositoController.deleteDeposito,
);

module.exports = router;
