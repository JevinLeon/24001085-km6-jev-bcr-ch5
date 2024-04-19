const express = require("express");

const router = express.Router();
const manufactureController = require("../controller/manufacture");
const { authMiddleware } = require("../middlewares/auth");

router
  .route("/")
  .get(
    authMiddleware(["guest", "admin", "superadmin"]),
    manufactureController.getManufactures
  )
  .post(
    authMiddleware(["admin", "superadmin"]),
    manufactureController.addManufacture
  );

router
  .route("/:id")
  .get(
    authMiddleware(["guest", "admin", "superadmin"]),
    manufactureController.getManufacture
  )
  .put(
    authMiddleware(["admin", "superadmin"]),
    manufactureController.updateManufacture
  )
  .delete(
    authMiddleware(["admin", "superadmin"]),
    manufactureController.deleteManufacture
  );

module.exports = router;
