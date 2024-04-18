const express = require("express");

const router = express.Router();
const carController = require("../controller/car");
const { authMiddleware } = require("../middlewares/auth");

router
  .route("/")
  .get(authMiddleware(["admin", "superadmin"]), carController.getCars)
  .post(authMiddleware(["admin", "superadmin"]), carController.addCar);

router
  .route("/:id")
  .get(authMiddleware(["admin", "superadmin"]), carController.getCar)
  .put(authMiddleware(["admin", "superadmin"]), carController.updateCar)
  .delete(authMiddleware(["admin", "superadmin"]), carController.deleteCar);

module.exports = router;
