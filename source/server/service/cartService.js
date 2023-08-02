import Cart from "../Models/cartItemModel.js";
import User_Model from "../Models/userModel.js";
import mongoose from "mongoose";

const cartService = {
  createCart: async (userId, data) => {
    console.log(data);
    const session = await mongoose.startSession();
    const opts = { session };
    // error flag maintains error state
    session.startTransaction();
    let flag = false;
    const cart = await Cart.create([data], opts);
    if (!cart) {
      return false;
    }
    const userCart = await User_Model.findByIdAndUpdate(userId, {
      $push: { cartItems: cart._id },
    });
    flag = flag || !userCart;
    if (flag) {
      await session.abortTransaction();
      session.endSession();
      return false;
    } else {
      await session.commitTransaction();
      session.endSession();
      return true;
    }
  },
};
export default cartService;
