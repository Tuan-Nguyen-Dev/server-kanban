import mongoose, { Schema } from "mongoose";

const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  parentId: String,
  slug: {
    type: String,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const CategoriesModel = mongoose.model("product", schema);
export default CategoriesModel;
