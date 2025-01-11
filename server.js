const express = require("express");
const cors = require("cors");

// const connectDB = require("./src/config/db");
// const routerTrans = require("./src/transactions/transaction");

const {
  loginRoute,
  getAllTransactions,
  getTransactionsBySchool,
  getTransactionStatus,
  updateTransactionStatus,
} = require("./src/transactions/transaction");

const app = express();
app.use(cors());
app.use(express.json());

require("dotenv").config();

app.use(express.json());

const PORT = 3000;

const initialServer = () => {
  try {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (e) {
    console.error("Server connection Error:", e);
  }
};
// app.use("/api", routerTrans);
app.post("/login", loginRoute);
app.get("/", getAllTransactions);
app.get("/school/:school_id", getTransactionsBySchool);
app.get("/status/:custom_order_id", getTransactionStatus);
app.post("/update-status", updateTransactionStatus);

initialServer();
