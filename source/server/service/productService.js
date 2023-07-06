import Product from "../Models/productModel.js";

const productService = {
  fetchAll: async (data) => {
    console.log(data);
    const filter = {};
    if (data) {
      for (const val in data) {
        filter[val] = data[val];
      }
    }

    const val = await Product.find({
      ...filter,
      // $or: [
      //   {
      //     name: { $regex: new RegExp(".*" + filter?.searchQuery + ".*", "i") },
      //   },
      //   {
      //     category: {
      //       $regex: new RegExp(".*" + filter?.searchQuery + ".*", "i"),
      //     },
      //   },
      //   {
      //     subCategory: {
      //       $regex: new RegExp(".*" + filter?.searchQuery + ".*", "i"),
      //     },
      //   },
      // ],
    });

    console.log(val);
    return val;
  },
};
export default productService;
