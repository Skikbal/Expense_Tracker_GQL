import mongoose, { mongo } from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  paymentType: {
    type: String,
    enum: ["cash", "card"],
    required: true,
  },
  category: {
    type: String,
    enum: ["saving", "investment", "expense"],
  },
  amount: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    default: "unknown",
  },
  date: {
    type: Date,
    required: true,
  },
});

const Transaction = mongoose.model("Transactrion", transactionSchema);
export default Transaction;
