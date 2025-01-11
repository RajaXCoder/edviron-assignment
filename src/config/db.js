const { MongoClient } = require("mongodb");
require("dotenv").config();

// Connection URL and database details
const url = process.env.MONGO_URL;
// console.log("mongo url", url);

const dbName = "test";

// Function to connect to MongoDB and return the collection
const connectDB = async () => {
  try {
    const client = new MongoClient(url);
    await client.connect();

    return client.db(dbName);
  } catch (err) {
    console.error("MongoDB Connection Error - X --->>", err);
    throw err;
  }
};

module.exports = connectDB;

// Example function to fetch all documents from the collection
// const getAllRequests = async () => {
//   const { client, collection } = await connectDB();
//   try {
//     const requests = await collection.find().toArray();
//     console.log("Data from collect_request:", requests);
//   } finally {
//     await client.close(); // Close the connection after operation
//   }
// };

// // Call the function to fetch data
// getAllRequests().catch((err) => console.error("Error fetching data:", err));

// const mongoose = require("mongoose");
// require("dotenv").config();

// const url =
//   "mongodb+srv://test-user:edviron@edvironassessment.ub8p5.mongodb.net/?retryWrites=true&w=majority&appName=edvironAssessment";

// const connectDB = () => {
//   mongoose
//     .connect(url)
//     .then(() => console.log("MongoDB Connected"))
//     .catch((err) => console.log("MongoDB Connection Error - X --->> ", err));
// };

// // connectDB();

// module.exports = connectDB;
