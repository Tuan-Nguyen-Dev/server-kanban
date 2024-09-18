import CategoriesModel from "../models/Categories";
import ProductModel from "../models/ProductModel";

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

const deleteCategories = async (req: any, res: any) => {
  const { id, isDeleted } = req.query;

  // isDeleted=== true thì xoá hẳn : cập nhật lại isDeleted
  try {
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

        if (isDeleted) {
          await CategoriesModel.findByIdAndDelete(id);
        } else {
          await CategoriesModel.findByIdAndUpdate(id, {
            isDeleted: false,
          });
        }
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

const updateCategories = async (req: any, res: any) => {};

export {
  getProducts,
  addCategory,
  getCategories,
  deleteCategories,
  updateCategories,
};
