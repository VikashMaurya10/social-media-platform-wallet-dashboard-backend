const mongoose = require("mongoose");

const transectionSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    transactionType: {
      type: String,
      require: true,
    },
    amount: {
      type: Number,
      requre: true,
    },
    remark: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const TransectionHistoryModel =
  mongoose.models.transection_history ||
  mongoose.model("transection_history", transectionSchema);

module.exports = TransectionHistoryModel;
