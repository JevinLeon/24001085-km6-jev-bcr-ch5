const express = require("express");

const router = express.Router();
const typeController = require("../controller/type");

router.route("/").get(typeController.getTypes).post(typeController.addType);

router
  .route("/:id")
  .get(typeController.getType)
  .put(typeController.updateType)
  .delete(typeController.deleteType);

module.exports = router;
