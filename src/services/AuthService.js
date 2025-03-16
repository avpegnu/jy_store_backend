const bcrypt = require("bcrypt");
const accounts = require("../models/account");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

const checkEmailExist = async (email) => {
  const emailExist = await accounts.findOne({ email: email });
  return emailExist ? true : false;
};

const hashPassword = async (password) => {
  try {
    const hashPassword = await bcrypt.hash(password, 13);
    return hashPassword;
  } catch (err) {
    return err;
  }
};

const createNewAccount = async (data) => {
  try {
    const account = await accounts.create(data);
    return account;
  } catch (err) {
    return err.message;
  }
};

const accountLogin = async (email, password) => {
  try {
    const account = await accounts.findOne({ email: email });
    const checkPassword = await bcrypt.compare(password, account.password);
    if (!checkPassword) {
      return { success: false };
    }

    const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "30s",
    });
    const refreshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "365d",
    });

    return {
      success: true,
      data: account._id,
      token: { accessToken, refreshToken },
    };
  } catch (err) {
    return err.message;
  }
};

const updatePassword = async (account_id, password, current) => {
  try {
    const account = await accounts.findOne({ _id: account_id });
    if (!account) {
      return { message: "Account not found", success: false };
    }

    const checkPassword = await bcrypt.compare(current, account.password);
    if (!checkPassword) {
      return { message: "Password is incorrect", success: false };
    }

    if (password == current) {
      return {
        message: "New password cannot be the same as the old password",
        success: false,
      };
    }

    const newPassword = await bcrypt.hash(password, 13);
    await accounts.findByIdAndUpdate(account_id, { password: newPassword });

    return { success: true, message: "Password updated successfully" };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

module.exports = {
  checkEmailExist,
  hashPassword,
  createNewAccount,
  accountLogin,
  updatePassword,
};
