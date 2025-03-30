const express = require("express");
const router = express.Router();
const authRoutes = require('./auth')
const paymentRoutes = require('./payment')

router.use(authRoutes)
router.use(paymentRoutes)


module.exports = router;