const express = require("express");

const router = express.Router();
const typeController = require("../controller/type");
const { authMiddleware } = require("../middlewares/auth");

router
  .route("/")
  .get(
    authMiddleware(["guest", "admin", "superadmin"]),
    typeController.getTypes
  )
  .post(authMiddleware(["admin", "superadmin"]), typeController.addType);

router
  .route("/:id")
  .get(authMiddleware(["guest", "admin", "superadmin"]), typeController.getType)
  .put(authMiddleware(["admin", "superadmin"]), typeController.updateType)
  .delete(authMiddleware(["admin", "superadmin"]), typeController.deleteType);

module.exports = router;
