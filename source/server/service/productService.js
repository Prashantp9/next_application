import Product from "../Models/productModel.js";

const productService = {
  fetchAll: async (data) => {
    console.log("data", data);
    const filter = {};
    if (data) {
      for (const val in data) {
        if (val !== "searchQuery") {
          filter[val] = data[val];
        }
      }
    }
    console.log(filter);
    const val = await Product.find({
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
    });
    // console.log(val);
    return val;
  },
  getProductById: async (id) => {
    return await Product.findById(id);
  },
};
export default productService;
