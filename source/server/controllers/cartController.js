import cartService from "../service/cartService.js";
import { responseType } from "../constants/allConstants.js";

const cartController = {
  createCart: async (req, res, next) => {
    try {
      const cartData = {
        productId: req.body.productId,
        quantity: req.body.quantity,
      };
      const response = await cartService.createCart(req.body._id, cartData);
      if (response) {
        return res.status(200).json({
          type: responseType.SUCCESS,
          message: "cart has been created successfully",
          data: response,
        });
      }
      if (!response) {
        return res.status(400).json({
          type: responseType.FAILURE,
          message: "failed to create cart",
          error: [],
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        type: "INTERNAL ERROR",
        message: "error occured",
        error: error,
      });
    }
  },
  deleteCart: async (req, res, next) => {
    try {
      const response = await cartService.delteCart(
        req.body._id,
        req.body.cartId
      );
      if (response) {
        return res.status(200).json({
          type: responseType.SUCCESS,
          message: "cart has been deleted successfully",
          data: response,
        });
      }
      if (!response) {
        return res.status(200).json({
          type: responseType.FAILURE,
          message: "failed to delete cart",
          error: [],
        });
      }
    } catch (error) {
      res.status(500).json({
        type: "INTERNAL ERROR",
        message: "internal server error",
        error: error,
      });
    }
  },
  getUserCart: async (req, res, next) => {
    try {
      const response = await cartService.getUserCart(req.body._id);
      if (response) {
        return res.status(200).json({
          type: responseType.SUCCESS,
          message: "cart fetched successfully",
          data: response,
        });
      }
      if (response) {
        return res.status(400).json({
          type: responseType.FAILURE,
          message: "failed to fetch cart",
          error: [],
        });
      }
    } catch (error) {
      return res.status(500).json({
        type: "INTERNAL ERROR",
        message: "internal server error occured",
        error: error,
      });
    }
  },
};
export default cartController;
