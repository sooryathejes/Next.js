// lib/db.js
import mongoose from "mongoose";

export const connectDB = async () => {
  if (mongoose.connections[0].readyState) return; // prevent multiple connections
  try {
    await mongoose.connect(
      "mongodb+srv://sooryathjs007:94468374@cluster0.yl2dfag.mongodb.net/todo-app",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("DB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
