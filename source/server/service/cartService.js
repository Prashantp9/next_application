import Cart from "../Models/cartItemModel.js";
import User_Model from "../Models/userModel.js";
import { json } from "express";
import mongoose from "mongoose";

const cartService = {
  getUserCart: async (userId) => {
    const cart = await User_Model.findById(userId, { cartItems: 1 }).populate({
      path: "cartItems",
      populate: {
        path: "productId",
        model: "products",
      },
    });
    let totalAmount = 0;
    cart.cartItems.map((elm, idx) => {
      let total = elm?.productId?.price * elm.quantity;
      totalAmount += total;
    });

    return { cart: cart, cartTotal: totalAmount };
  },

  createCart: async (userId, data) => {
    const session = await mongoose.startSession();
    const opts = { session };
    // error flag maintains error state
    session.startTransaction();
    let flag = false;
    const cart = await Cart.create([data], opts);
    if (!cart) {
      return false;
    }
    const userCart = await User_Model.findOneAndUpdate(
      { _id: userId },
      {
        $push: { cartItems: cart[0]?._id },
      }
    );
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
  delteCart: async (userId, cartId) => {
    const session = await mongoose.startSession();
    const opts = { session };
    session.startTransaction();
    let flag = false;
    const cart = await Cart.findByIdAndDelete(cartId, opts);
    //  remove cart from user's cart list
    const removeFromCartItems = await User_Model.findByIdAndUpdate(userId, {
      $pull: { cartItems: cartId },
    });
    flag = flag || !removeFromCartItems;
    if (flag) {
      await session.abortTransaction();
      session.endSession();
      return false;
    } else {
      await session.commitTransaction();
      session.endSession();
      return cart;
    }
  },
};
export default cartService;
