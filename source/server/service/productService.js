import Product from "../Models/productModel.js";

const productService = {
  fetchAll: async () => {
    return await Product.find({});
  },
};
export default productService;
