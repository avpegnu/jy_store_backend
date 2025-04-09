const express = require("express");
const router = express.Router();
const authRoutes = require("./auth");
const paymentRoutes = require("./payment");
const emailRoutes = require("./email");
const uploadRoutes = require("./upload");
const productRoutes = require("./product");

router.use(authRoutes);
router.use(paymentRoutes);
router.use(emailRoutes);
router.use(uploadRoutes);
router.use(productRoutes);

module.exports = router;
