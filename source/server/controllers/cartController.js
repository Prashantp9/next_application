import cartService from "../service/cartService";
import { responseType } from "../constants/allConstants";

export default cartController = {
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
    }
  },
};
