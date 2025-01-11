// src/transactions.js
const connectDB = require("../config/db");
const jwt = require("jsonwebtoken");

const loginRoute = async (req, res) => {
  const { email, password } = req.body;
  const { EMAIL, PASSWORD, JWT_SECRET } = process.env;
  console.log(EMAIL, PASSWORD, JWT_SECRET);
  try {
    if (email !== EMAIL || password !== PASSWORD) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = await jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
};

// Function to get all transactions
const getAllTransactions = async (req, res) => {
  try {
    const db = await connectDB();
    const transactions = await db
      .collection("collect_request_status")
      .find()
      .toArray();

    console.log("MongoDB Connected For Get All Data");
    res.json({ transactions });

    // const statusFilter = req.query.status || "All";
    // console.log(req.query.status);

    // try {
    //   let transactions;
    //   if (statusFilter === "All") {
    //     transactions = await db
    //       .collection("collect_request_status")
    //       .find()
    //       .toArray();
    //   } else {
    //     transactions = await db
    //       .collection("collect_request_status")
    //       .find({ status: statusFilter} )
    //       .toArray(); // Filter by status
    //   }

    //   res.status(200).json({ transactions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Function to get transactions by school ID
const getTransactionsBySchool = async (req, res) => {
  const { school_id } = req.params;
  try {
    const db = await connectDB();
    const transactions = await db
      .collection("collect_request")
      .find({ school_id })
      .toArray();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Function to get a transaction status by custom order ID
const getTransactionStatus = async (req, res) => {
  const { custom_order_id } = req.params;
  try {
    const db = await connectDB();
    const transaction = await db
      .collection("collect_request")
      .findOne({ custom_order_id });
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Function to update a transaction status by custom order ID
const updateTransactionStatus = async (req, res) => {
  const { custom_order_id, status } = req.body;
  try {
    const db = await connectDB();
    const updatedTransaction = await db
      .collection("collect_request_status")
      .findOneAndUpdate(
        { custom_order_id },
        { $set: { status } },
        { returnOriginal: false } // Use `returnOriginal: false` to get the updated document
      );
    res.json(updatedTransaction.value);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Export all functions
module.exports = {
  loginRoute,
  getAllTransactions,
  getTransactionsBySchool,
  getTransactionStatus,
  updateTransactionStatus,
};

// // src/transactions.js
// const connectDB = require('../config/db')
// const Transaction = require("../models/model");

// // Function to get all transactions
// const getAllTransactions = async (req, res) => {
//   try {
//     const transactions = await Transaction.find().toArray();
//     console.log(transactions);
//     console.log(Transaction);
//     res.json({ transactions });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Function to get transactions by school ID
// const getTransactionsBySchool = async (req, res) => {
//   const { school_id } = req.params;
//   try {
//     const transactions = await Transaction.find({ school_id });
//     res.json(transactions);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Function to get a transaction status by custom order ID
// const getTransactionStatus = async (req, res) => {
//   const { custom_order_id } = req.params;
//   try {
//     const transaction = await Transaction.findOne({ custom_order_id });
//     res.json(transaction);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Function to update a transaction status by custom order ID
// const updateTransactionStatus = async (req, res) => {
//   const { custom_order_id, status } = req.body;
//   try {
//     const updatedTransaction = await Transaction.findOneAndUpdate(
//       { custom_order_id },
//       { status },
//       { new: true }
//     );
//     res.json(updatedTransaction);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Export all functions
// module.exports = {
//   getAllTransactions,
//   getTransactionsBySchool,
//   getTransactionStatus,
//   updateTransactionStatus,
// };
