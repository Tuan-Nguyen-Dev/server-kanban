import CategoriesModel from "../models/Categories";

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
  try {
    const categories = await CategoriesModel.find();
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

export { getProducts, addCategory, getCategories };
