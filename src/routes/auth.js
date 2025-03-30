const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");

router.post("/auth/login", authController.handleLogin);
router.post("/auth/signup", authController.handleRegister);
router.put("/auth/change-password", authController.changePassword);
router.get("/accounts", authController.getAccounts);

module.exports = router;
