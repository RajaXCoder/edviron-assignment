// src/app.js
const express = require("express");

const transactionsRoutes = require("./routes/route");
const connectDB = require("./config/db");

const app = express();
require("dotenv").config();
connectDB();

app.use(express.json());
// app.use("/api/transactions", transactionsRoutes);

module.exports = app;
