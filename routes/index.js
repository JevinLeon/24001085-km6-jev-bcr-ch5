const express = require("express");

const router = express.Router();
const carRoutes = require("./car");
const manufactureRoutes = require("./manufacture");
const typeRoutes = require("./type");
const transmissionRoutes = require("./transmission");
const authRoutes = require("./auth");

router.use("/manufactures", manufactureRoutes);
router.use("/types", typeRoutes);
router.use("/transmissions", transmissionRoutes);
router.use("/cars", carRoutes);
router.use("/auth", authRoutes);

module.exports = router;
