import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGOURI);
    console.log("successfully connected to the database");
  } catch (error) {
    console.log(error);
  }
};
export default connectDB;
