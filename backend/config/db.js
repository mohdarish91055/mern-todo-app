const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Connected to ${conn.connection.name}`);
  } catch (error) {
    console.error("Error in connecting to MongoDB", error);
  }
};

module.exports = connectDB;
