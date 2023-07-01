import mongoose from "mongoose";

const product = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    name: String,
    catId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
  },
});

const Product = mongoose.model("products", product);

export default Product;
