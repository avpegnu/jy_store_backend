// routes/upload.route.js
const express = require("express");
const router = express.Router();
const { uploadCloud } = require("../services/UploadService");

router.post("/upload", uploadCloud.single("image"), (req, res) => {
  res.json({
    success: true,
    message: "Upload thành công!",
    url: req.file.path,
    file: req.file,
  });
});

module.exports = router;
