import Product from "../Models/productModel.js";

const productService = {
  fetchAll: async (data) => {
    let filter = {};
    if (data) {
      for (const val in data) {
        if (val !== "searchQuery") {
          filter[val] = data[val];
        }
      }
    }
    if (data?.searchQuery) {
      filter = {
        ...filter,
        $or: [
          {
            title: { $regex: new RegExp(".*" + data?.searchQuery + ".*", "i") },
          },
          {
            "category.name": {
              $regex: new RegExp(".*" + data?.searchQuery + ".*", "i"),
            },
          },
        ],
      };
    }
    const val = await Product.find(filter);
    return val;
  },
  getProductById: async (id) => {
    return await Product.findById(id);
  },
};
export default productService;
