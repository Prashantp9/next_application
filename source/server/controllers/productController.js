import productService from "../service/productService.js";
import { responseType } from "../constants/allConstants.js";

const product = {
  fetchAll: async (req, res, next) => {
    try {
      const response = await productService.fetchAll(req.body.filter);
      if (response) {
        return res.status(200).json({
          type: responseType.SUCCESS,
          message: "successfully fetched data",
          data: response,
        });
      }
      if (!response) {
        return res.status(400).json({
          type: responseType.FAILURE,
          message: "failed to fetch data",
          error: [],
        });
      }
    } catch (error) {
      next(error);
    }
  },
  fetchProduct: async (req, res, next) => {
    try {
      const { productId } = req.body;
      const response = await productService.getProductById(productId);
      if (response) {
        return res.status(200).json({
          type: responseType.SUCCESS,
          message: "successfully fetched data",
          data: response,
        });
      }
      if (!response) {
        return res.status(400).json({
          type: responseType.FAILURE,
          message: "failed to fetch data",
          error: [],
        });
      }
    } catch (error) {}
  },
};
export default product;
