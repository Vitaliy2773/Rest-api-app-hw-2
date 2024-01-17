const mongoose = require("mongoose");


const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB at:", process.env.MONGO_DB_URI);
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
