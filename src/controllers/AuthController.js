const {
  checkEmailExist,
  hashPassword,
  createNewAccount,
  accountLogin,
  updatePassword,
  getAllAccounts,
  updateAccountById,
} = require("../services/AuthService");

const handleRegister = async (req, res) => {
  const data = req?.body;
  const emailExist = await checkEmailExist(data?.email);
  if (emailExist) {
    res.status(400).json({
      success: "false",
      message: "Email đã tồn tại!",
    });
  } else {
    const passwordDB = await hashPassword(data?.password);
    const newData = {
      ...data,
      password: passwordDB,
    };

    const accountData = await createNewAccount(newData);
    res.status(200).json({
      success: "true",
      message: "Đăng ký tài khoản thành công!",
      data: accountData,
    });
  }
};

const handleLogin = async (req, res) => {
  const email = req?.body?.email;
  const password = req?.body?.password;
  const accountExist = await checkEmailExist(email);
  if (!accountExist) {
    res.status(400).json({
      success: false,
      message: "Email chưa đăng ký!",
    });
    return;
  }

  const accountCheck = await accountLogin(email, password);

  if (!accountCheck.success) {
    res.status(400).json({
      success: false,
      message: "Mật khẩu không đúng!",
    });
    return;
  }

  res.status(200).json({
    success: true,
    message: "Đăng nhập thành công!",
    token: accountCheck.token,
    account: accountCheck.data,
  });
};

const changePassword = async (req, res) => {
  try {
    const account_id = req.body?.account_id;
    const password = req.body?.password;
    const current = req.body?.current;
    const response = await updatePassword(account_id, password, current);
    if (!response.success) {
      res.status(404).json({
        success: false,
        message: response?.message,
      });
    }
    res.status(200).json({
      success: true,
      message: response?.message,
    });
  } catch (err) {
    return err.message;
  }
};
const getAccounts = async (req, res) => {
  try {
    const accountsData = await getAllAccounts();
    res.status(200).json({
      success: true,
      message: "Lấy danh sách tài khoản thành công!",
      data: accountsData,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Lỗi lấy danh sách tài khoản",
    });
  }
};

const updateAccount = async (req, res) => {
  try {
    console.log(1);
    const { id } = req.params;
    const updated = await updateAccountById(id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Cập nhật tài khoản thất bại", error: err });
  }
};

module.exports = {
  handleRegister,
  handleLogin,
  changePassword,
  getAccounts,
  updateAccount,
};
