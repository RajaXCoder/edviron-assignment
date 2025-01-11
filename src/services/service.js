// src/services/service.js
const Transaction = require("../models/model");

async function getAllTransactions() {
  return await Transaction.find();
}

async function getTransactionsBySchool(school_id) {
  return await Transaction.find({ school_id });
}

async function getTransactionStatus(custom_order_id) {
  return await Transaction.findOne({ custom_order_id });
}

async function updateTransactionStatus(custom_order_id, status) {
  return await Transaction.findOneAndUpdate(
    { custom_order_id },
    { status },
    { new: true }
  );
}

module.exports = {
  getAllTransactions,
  getTransactionsBySchool,
  getTransactionStatus,
  updateTransactionStatus,
};
