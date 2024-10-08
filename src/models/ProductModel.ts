import mongoose, { Schema } from "mongoose";

const productScheme = new Schema({
  title: {
    type: String,
    required: true,
  },
  slug: String,
  description: String,
  expiryDate: {
    type: Date,
  },
  content: String,
  supplier: {
    required: true,
    type: String,
  },
  images: {
    type: [String],
  },
  categories: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const ProductModel = mongoose.model("product", productScheme);
export default ProductModel;
