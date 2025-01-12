// config/db.js
const { MongoClient } = require("mongodb");
require("dotenv").config();

const dbName = "test";

let db = null;

const connectDB = async () => {
  if (db) return db; // Reuse the existing connection

  try {
    const client = new MongoClient(process.env.MONGO_URL);
    await client.connect();
    db = client.db(dbName); // Store the connected DB instance
    console.log("MongoDB Connected Successfully");
    return db;
  } catch (err) {
    console.error("MongoDB Connection Error --->>", err);
    throw err;
  }
};

module.exports = connectDB;
