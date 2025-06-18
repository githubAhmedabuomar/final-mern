import express from "express";
import { isadmin, isuser } from "../middlewares/authmiddlewares.js";
import {
  createCategory,
  getallCategories,
  deletecategorycontroller,
  updatecategorycontroller,
} from "../controllers/categoryControllers.js";
import bodyparser from "body-parser";
const router = express.Router();
router.post(
  "/createCategory",
  bodyparser.urlencoded({ extended: true }),
  isuser,
  isadmin,
  createCategory
);
router.get("/getallCategories", getallCategories);
// router.get("/getsingleCategory/:slug",isuser,isadmin,getsingleCategory);
router.put(
  "/updateCategory/:id",
  bodyparser.urlencoded({ extended: true }),
  isuser,
  isadmin,
  updatecategorycontroller
);
router.delete("/deleteCategory/:name", deletecategorycontroller);
export default router;
