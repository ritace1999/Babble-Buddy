import mongoose from "mongoose";
export const connectDb = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_DB_URI}`);
    console.log("Connection to the database has been established.");
  } catch (error) {
    console.log("Failed to establish connection.", error.message);
    process.exit(1);
  }
};
