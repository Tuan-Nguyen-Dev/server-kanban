import { Router } from "express";
import {
  addCategory,
  addProduct,
  deleteCategories,
  getCategories,
  getProducts,
  updateCategories,
} from "../controllers/products";

const router = Router();

//product
router.post("/add-new", addProduct);
router.get("/", getProducts);

//categories
router.post("/add-category", addCategory);
router.get("/get-categories", getCategories);
router.delete("/delete-category", deleteCategories);
router.put("/update-category", updateCategories);
export default router;
