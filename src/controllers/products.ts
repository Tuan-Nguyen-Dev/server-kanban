import { ObjectId } from "mongoose";
import CategoriesModel from "../models/Categories";
import ProductModel from "../models/ProductModel";
import { CategoryModel } from "./../../../kanban/src/models/ProductModel";

const getProducts = (req: any, res: any) => {
  try {
    res.status(200).json({
      message: "Product",
      data: [],
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const addCategory = async (req: any, res: any) => {
  const body = req.body;

  const { parentId, title, description, slug } = body;

  try {
    const category = await CategoriesModel.find({
      $and: [{ parentId: { $eq: parentId } }, { slug: { $eq: slug } }],
    });

    if (category.length > 0) {
      throw Error("Category is existing");
    }

    const newCategory = new CategoriesModel(body);

    await newCategory.save();

    res.status(200).json({
      message: "Product",
      data: [],
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const getCategories = async (req: any, res: any) => {
  const { page, pageSize } = req.query;

  try {
    const skip = (page - 1) * pageSize;

    const categories = await CategoriesModel.find({
      $or: [{ isDeleted: false }, { isDeleted: null }],
    })
      .skip(skip)
      .limit(pageSize);

    res.status(200).json({
      message: "Products",
      data: categories,
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const findAndRemoveCategoryInProducts = async (id: string) => {
  const items = await CategoriesModel.find({ parentId: id });
  if (items.length > 0) {
    items.forEach(async (category: any) => {
      findAndRemoveCategoryInProducts(category._id);
    });
  }

  await handleRemoveCategoryInProducts(id);
};

const handleRemoveCategoryInProducts = async (id: string) => {
  await CategoriesModel.findByIdAndDelete(id);
  const products = await ProductModel.find({ categories: { $all: id } });

  if (products && products.length > 0) {
    products.forEach(async (item: any) => {
      const cats = item._doc.categories;

      const index = cats.findIndex((element: string) => element === id);
      if (index != -1) {
        cats.splice(index, 1);
      }

      await ProductModel.findByIdAndUpdate(item._id, {
        categories: cats,
      });
    });
  }
};

const deleteCategories = async (req: any, res: any) => {
  const { id, isDeleted } = req.query;

  try {
    await findAndRemoveCategoryInProducts(id);

    if (isDeleted) {
      await CategoriesModel.findByIdAndDelete(id);
    } else {
      await CategoriesModel.findByIdAndUpdate(id, {
        isDeleted: true,
      });
    }

    res.status(200).json({
      message: "Delete Categories",
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const updateCategories = async (req: any, res: any) => {
  const { id } = req.query;
  const body = req.body;

  try {
    await CategoriesModel.findByIdAndUpdate(id, body);
    const item = await CategoriesModel.findById(id);
    res.status(200).json({
      message: "Updated Categories",
      data: item,
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export {
  getProducts,
  addCategory,
  getCategories,
  deleteCategories,
  updateCategories,
};
