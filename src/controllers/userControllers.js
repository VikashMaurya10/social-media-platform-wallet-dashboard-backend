const UserDataModel = require("../models/userDataModel");
const {
  HandleSuccess,
  HandleError,
  HandleServerError,
  ValidateEmail,
  PasswordStrength,
  ValidUserName,
} = require("../helpers/handlers");

const getAllData = async (req, res) => {
  const id = req.params.id;
  const userData = await UserDataModel.findOne({ userId: id });

  if (!userData) {
    return HandleError(res, "User data not found");
  }

  HandleSuccess(res, userData);
};

const updateWallet = async (req, res) => {
  const { id } = req.params;
  const { amount, remark } = req.body;

  // console.log("params", id);
  // console.log("body", req.body);

  const userData = await UserDataModel.findOne({ userId: id });
  if (!userData) HandleError(res, "User data not found");
  // console.log(userData);

  try {
    const newAmount = userData.balance + amount;

    const updated = await UserDataModel.findByIdAndUpdate(userData._id, {
      balance: newAmount,
      remark: remark,
    });

    if (!updated) HandleError(res, "wallet couldn't be updated");

    HandleSuccess(res, "update Wallet");
  } catch (error) {
    HandleError(res, "err");
  }
};

module.exports = { updateWallet, getAllData };
