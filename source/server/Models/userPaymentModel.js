import mongoose from "mongoose";

const userPaymentSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  paymentType: {
    type: String,
    required: true,
  },
});

const User_Payment_Schema = mongoose.model(
  "User_Payment_Schema",
  userPaymentSchema
);

export default User_Payment_Schema;
