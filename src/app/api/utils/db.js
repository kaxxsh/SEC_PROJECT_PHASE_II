import { connect, connection } from "mongoose";

const dbConnection = () => {
  try {
    connect(process.env.MONGO_URL);
    connection.on("connected", () => {
      console.log("MongoDB connection established successfully");
    });
  } catch (error) {
    console.log("Error in connecting to DB", error);
  }
};

export default dbConnection;
