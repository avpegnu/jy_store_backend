const express = require("express");
const router = express.Router();
const authRoutes = require("./auth");
const paymentRoutes = require("./payment");
const emailRoutes = require("./email");
const uploadRoutes = require("./upload");
const productRoutes = require("./product");
const orderRoutes = require("./order");
const reviewRoutes = require("./review");
const chatRoutes = require("./chat");
const statsRoutes = require("./stats");

router.use(authRoutes);
router.use(paymentRoutes);
router.use(emailRoutes);
router.use(uploadRoutes);
router.use(productRoutes);
router.use(orderRoutes);
router.use(reviewRoutes);
router.use(chatRoutes);
router.use(statsRoutes);

module.exports = router;
