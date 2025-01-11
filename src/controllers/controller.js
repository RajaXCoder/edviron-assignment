// src/controllers/controller.js
const transactionsService = require("../services/service");

const getAllTransactions = async (req, res) => {
  const transactions = await transactionsService.getAllTransactions();
  res.json(transactions);
};

const getTransactionsBySchool = async (req, res) => {
  const { school_id } = req.params;
  const transactions = await transactionsService.getTransactionsBySchool(
    school_id
  );
  res.json(transactions);
};

const getTransactionStatus = async (req, res) => {
  const { custom_order_id } = req.params;
  const transaction = await transactionsService.getTransactionStatus(
    custom_order_id
  );
  res.json(transaction);
};

const updateTransactionStatus = async (req, res) => {
  const { custom_order_id, status } = req.body;
  const updatedTransaction = await transactionsService.updateTransactionStatus(
    custom_order_id,
    status
  );
  res.json(updatedTransaction);
};

module.exports = {
  getAllTransactions,
  getTransactionsBySchool,
  getTransactionStatus,
  updateTransactionStatus,
};
