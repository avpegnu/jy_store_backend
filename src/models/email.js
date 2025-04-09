const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Đảm bảo mỗi email chỉ xuất hiện một lần
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, "Email không hợp lệ!"], // Kiểm tra định dạng email
  },
  subscribedAt: {
    type: Date,
    default: Date.now, // Thời gian đăng ký
  },
});

const Email = mongoose.model("Email", emailSchema);

module.exports = Email;
