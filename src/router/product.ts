import { Router } from "express";
import {
  addCategory,
  addProduct,
  addSubProduct,
  deleteCategories,
  getCategories,
  getCategoriesDetails,
  getProductDetail,
  getProducts,
  removeProduct,
  updateCategories,
  updateProduct,
} from "../controllers/products";

const router = Router();

//product
router.post("/add-new", addProduct);
router.get("/", getProducts);
router.post("/add-sub-product", addSubProduct);
router.delete("/delete", removeProduct);
router.get("/detail", getProductDetail);
router.put("/update", updateProduct);

//categories
router.post("/add-category", addCategory);
router.get("/get-categories", getCategories);
router.get("/categories/details", getCategoriesDetails);
router.delete("/delete-category", deleteCategories);
router.put("/update-category", updateCategories);
export default router;
