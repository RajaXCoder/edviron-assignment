// src/models/model.js
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  collect_id: String,
  status: String,
  payment_method: String,
  gateway: String,
  transaction_amount: Number,
  bank_reference: String,
});

module.exports = mongoose.model("Transaction", transactionSchema);
