const { sendEmail } = require("../services/EmailService");
const Email = require("../models/email");

const subscribeNewsletter = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email không hợp lệ!" });
  }

  try {
    // Kiểm tra xem email đã tồn tại trong database chưa
    const existingEmail = await Email.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email đã đăng ký trước đó!" });
    }

    // Lưu email vào database
    const newEmail = new Email({ email });
    await newEmail.save();

    // Gửi email thông báo đăng ký
    const result = await sendEmail(email);

    if (result.success) {
      return res.status(200).json({ message: result.message });
    } else {
      return res.status(500).json({ message: result.message });
    }
  } catch (error) {
    console.error("Lỗi khi lưu email:", error);
    return res
      .status(500)
      .json({ message: "Đã có lỗi xảy ra, vui lòng thử lại!" });
  }
};

module.exports = { subscribeNewsletter };
