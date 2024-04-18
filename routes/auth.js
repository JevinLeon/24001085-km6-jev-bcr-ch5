const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const { authMiddleware } = require("../middlewares/auth");

router.post("/register", userController.register);
router.post(
  "/create-admin",
  authMiddleware(["superadmin"]),
  userController.createAdmin
);
router.post("/login", userController.login);
router.post(
  "/profile",
  authMiddleware(["guest", "admin", "superadmin"]),
  userController.profile
);

module.exports = router;
