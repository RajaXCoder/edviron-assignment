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
  createCollectRequest,
} = require("./src/transactions/transaction");

const authMiddleware = require("./src/middlewares/auth.middleware");

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
app.get("/transactions/", authMiddleware, getAllTransactions);
app.get(
  "/transactions/school/:school_id",
  authMiddleware,
  getTransactionsBySchool
);
app.get(
  "/transactions/status/:custom_order_id",
  authMiddleware,
  getTransactionStatus
);
app.post(
  "/transactions/update-status",
  authMiddleware,
  updateTransactionStatus
);
app.post(
  "/payments/create-collect-request",
  authMiddleware,
  createCollectRequest
);

initialServer();
