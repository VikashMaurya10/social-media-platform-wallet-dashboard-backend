const mongoose = require("mongoose");

const UserDataSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    balance: {
      type: Number,
      default: 0,
      require: true,
    },
  },
  { timestamps: true }
);

const UserDataModel =
  mongoose.models.users_data || mongoose.model("users_data", UserDataSchema);

module.exports = UserDataModel;
