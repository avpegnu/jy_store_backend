// services/EmailService.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Đảm bảo đã cài biến môi trường EMAIL_USER
    pass: process.env.EMAIL_PASS, // Đảm bảo đã cài biến môi trường EMAIL_PASS
  },
});

const sendEmail = async (email) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Đảm bảo sử dụng đúng email
    to: email,
    subject: "Chúc mừng bạn đã đăng ký thành công! 🎉",
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
            <h2 style="color: #333333; text-align: center;">Chào mừng bạn đến với <strong>JYSTORE</strong>!</h2>
            <p>Xin chúc mừng, bạn đã đăng ký thành công nhận thông báo các ưu đãi đặc biệt từ chúng tôi.</p>
            <p>Với đăng ký này, bạn sẽ là người đầu tiên nhận được thông tin về các sản phẩm mới, chương trình khuyến mãi và những ưu đãi hấp dẫn từ <strong>JYSTORE</strong>.</p>
            
            <p>Chúng tôi rất vui khi có bạn trong cộng đồng khách hàng của chúng tôi và cam kết sẽ mang đến những sản phẩm tốt nhất cho bạn.</p>
            
            <h3 style="color: #333333;">Cảm ơn bạn đã đồng hành cùng chúng tôi!</h3>
            
            <p>Để biết thêm chi tiết về sản phẩm hoặc chương trình khuyến mãi, đừng ngần ngại truy cập website của chúng tôi:</p>
            <p><a href="#" style="color: #007BFF;">Visit Our Website</a></p>

            <hr style="border: 1px solid #ddd;" />
            <p style="text-align: center; color: #777777; font-size: 0.9em;">Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua email: <a href="mailto:vietanh142004@gmail.com" style="color: #007BFF;">vietanh142004@gmail.com</a></p>
            <p style="text-align: center; color: #777777; font-size: 0.9em;">&copy; 2025 <strong>JYSTORE</strong> - Tất cả quyền lợi được bảo lưu.</p>
          </div>
        </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: "Email đã được gửi thành công!" };
  } catch (error) {
    console.error("Lỗi khi gửi email:", error);
    return { success: false, message: "Gửi email thất bại!" };
  }
};

module.exports = { sendEmail };
