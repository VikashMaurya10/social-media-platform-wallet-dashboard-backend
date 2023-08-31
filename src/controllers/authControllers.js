const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const UserModel = require("../models/userModel");
const UserDataModel = require("../models/userDataModel");

const {
  HandleSuccess,
  HandleError,
  HandleServerError,
  ValidateEmail,
  PasswordStrength,
  ValidUserName,
} = require("../helpers/handlers");

const secret = process.env.JWT_SECRET;

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let isValidUsername = ValidUserName(username);
    let isValidEmail = ValidateEmail(email);
    let isPasswordStrong = PasswordStrength(password);

    if (!isValidUsername) {
      HandleError(res, "Please enter username");
    }
    if (!isValidEmail) {
      HandleError(res, "Please enter valid email");
    }
    if (!isPasswordStrong) {
      HandleError(
        res,
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
    }

    // Check if email already exists
    const isExistUserEmail = await UserModel.findOne({ email });
    if (isExistUserEmail) {
      return HandleSuccess(res, { data: `${email} is already registered` });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!isExistUserEmail) {
      const user = await UserModel.create({
        username: username,
        email: email,
        password: hashedPassword,
      });

      if (!user) {
        return HandleError(res, err);
      }

      const userDefaultWallet = await UserDataModel.create({
        userId: user._id,
        balance: 0,
        trasectionsType: "",
      });

      if (!userDefaultWallet) {
        return HandleError(res, err);
      }

      HandleSuccess(res, { data: "now registered" });
    }
  } catch (error) {
    HandleServerError(res);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!ValidateEmail(email) || !PasswordStrength(password)) {
      return HandleError(res, "please enter valid email or password");
    }

    // Check if user not exists
    const User = await UserModel.findOne({ email });

    if (!User) {
      return HandleError(res, "User with this email doesn't exist");
    }

    const isPasswordValid = await bcrypt.compare(password, User.password);

    if (!isPasswordValid) {
      return HandleError(res, "Please enter correct password");
    }

    // generate token
    const token = jwt.sign({ id: User._id }, secret, { expiresIn: 900 }); // Expires in 15 minutes
    userData = {
      token,
    };

    HandleSuccess(res, userData);
  } catch (error) {
    HandleServerError(res);
  }
};

module.exports = { register, login };
