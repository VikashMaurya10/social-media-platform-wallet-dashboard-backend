const UserDataModel = require("../models/userDataModel");
const transactionHistoryModel = require("../models/transectionHistoryModel");
const {
  HandleSuccess,
  HandleError,
  HandleServerError,
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
  const { amount, remark, transactionType } = req.body;
  console.log("body", req.body);

  const userData = await UserDataModel.findOne({ userId: id });
  if (!userData) return HandleError(res, "User data not found");

  try {
    const newAmount =
      transactionType == "deposit"
        ? userData.balance + amount
        : transactionType == "cradit"
        ? userData.balance - amount
        : HandleError(res, "wallet couldn't be updated");

    const updated = await UserDataModel.findByIdAndUpdate(userData._id, {
      balance: newAmount,
    });

    // save transection history
    const transactionHistory = new transactionHistoryModel({
      userId: id,
      transactionType: transactionType,
      amount: amount,
      remark: remark,
    });
    await transactionHistory.save();

    if (!updated) HandleError(res, "wallet couldn't be updated");

    HandleSuccess(res, "update Wallet");
  } catch (error) {
    HandleError(res, "err");
  }
};

const transactions = async (req, res) => {
  const { id } = req.params;
  console.log("history", req.params.id);

  const transactions = await transactionHistoryModel
    .find({ userId: id })
    .sort("-createdAt");
  if (!transactions) return HandleError(res, "User's transection not found!");
  console.log("history route");
  HandleSuccess(res, transactions);
};

module.exports = { updateWallet, getAllData, transactions };
