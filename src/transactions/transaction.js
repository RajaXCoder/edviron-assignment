// src/transactions.js
const connectDB = require("../config/db");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const loginRoute = async (req, res) => {
  const { email, password } = req.body;
  const { EMAIL, PASSWORD, PG_KEY } = process.env;
  try {
    if (email !== EMAIL || password !== PASSWORD) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = await jwt.sign({ email }, PG_KEY);

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
    const transactions = await db.collection("transactions").find().toArray();

    console.log("MongoDB Connected For Get All Data");
    res.json({ transactions });
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
        { returnOriginal: false }
      );
    res.json(updatedTransaction.value);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createCollectRequest = async (req, res) => {
  
  // const amount = 10000;
  const db = await connectDB();
  const sign = jwt.sign(
    {
      school_id: process.env.SCHOOL_ID,
      collect_request_id: `request_${Date.now()}`,
    },
    process.env.API_KEY
  );

  try {
    const response = await axios.post(
      "https://dev-vanilla.edviron.com/erp/create-collect-request",
      {
        pg_key: process.env.PG_KEY,
        amount,
        sign,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    );

    const transaction = {
      school_id: process.env.SCHOOL_ID,
      amount,
      status: "Pending",
      collect_request_id: response.data.collect_request_id,
      createdAt: new Date(),
    };

    await db.collection("transactions").insertOne(transaction);

    res.redirect(response.data.payment_link);
    // res.status(200).json({ transaction });
  } catch (error) {
    console.error("Error creating collect request:", error);
    res.status(500).send("Error creating collect request.");
  }
};

// Export all functions
module.exports = {
  loginRoute,
  getAllTransactions,
  getTransactionsBySchool,
  getTransactionStatus,
  updateTransactionStatus,
  createCollectRequest,
};
