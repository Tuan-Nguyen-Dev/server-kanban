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
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const CategoriesModel = mongoose.model("categories", schema);
export default CategoriesModel;
