const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const DB_HOST = process.env.MONGO_DB_URI;

async function startServer() {
  try {
    await mongoose.connect(DB_HOST);
    console.log("Database connection successful");

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1);
  }
}

startServer();
