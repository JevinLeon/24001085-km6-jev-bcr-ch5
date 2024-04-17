const express = require("express");

const router = express.Router();
const transmissionController = require("../controller/transmission");

router
  .route("/")
  .get(transmissionController.getTransmissions)
  .post(transmissionController.addTransmission);

router
  .route("/:id")
  .get(transmissionController.getTransmission)
  .put(transmissionController.updateTransmission)
  .delete(transmissionController.deleteTransmission);

module.exports = router;
