const {
  checkEmailExist,
  hashPassword,
  createNewAccount,
  accountLogin,
  updatePassword,
  index,
} = require("../services/AuthService");

const handleRegister = async (req, res) => {
  const data = req?.body;
  const emailExist = await checkEmailExist(data?.email);
  if (emailExist) {
    res.status(400).json({
      success: "false",
      message: "Email already exist!",
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
      message: "Account created successfully",
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
      message: "Account not found!",
    });
    return;
  }

  const accountCheck = await accountLogin(email, password);

  if (!accountCheck.success) {
    res.status(400).json({
      success: false,
      message: "Password is not Correct!",
    });
    return;
  }

  res.status(200).json({
    success: true,
    message: "Login successfully",
    token: accountCheck.token,
    account_id: accountCheck.data,
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

module.exports = {
  handleRegister,
  handleLogin,
  changePassword,
};
