import mongoose from "mongoose";

const productCategory = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  desc: {
    type: String,
  },
});

const Product_Category = mongoose.model("Product_Category", productCategory);

export default Product_Category;
