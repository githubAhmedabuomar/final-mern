import formidable from "express-formidable";
import { isuser, isadmin } from "../middlewares/authmiddlewares.js";
import {
  createproductcontroller,
  deleteproductcontroller,
  getallProductscontroller,
  getsingleproductcontroller,
  getproductphotocontroller,
  updateproductcontroller,
  filteredproducts,
  productlist,
  productscount,
  serachedproductscontroller,
  getsimilarproductscontroller,
  getcategoryproducts,
  braintreetokencontroller,
  braintreepaymentcontroller,
} from "../controllers/productControllers.js";
import express from "express";
import bodyParser from "body-parser";
const router = express.Router();
router.put(
  "/updateproduct",
  isuser,
  isadmin,
  formidable(),
  updateproductcontroller
);
router.post(
  "/createProduct",
  isuser,
  isadmin,
  formidable(),
  createproductcontroller
);
router.post(
  "/getfilteredproducts",
  bodyParser.urlencoded({ extended: true }),
  filteredproducts
);
router.get("/getallProducts", getallProductscontroller);
router.get("/getsimilarproducts/:slug", getsimilarproductscontroller);
router.get("/getproductphoto/:id", getproductphotocontroller);
router.get("/getsingleproduct/:slug", getsingleproductcontroller);
router.delete("/deleteproduct/:id", isuser, isadmin, deleteproductcontroller);
router.get("/getcount", productscount);
router.get("/getcategoryproducts/:slug", getcategoryproducts);
router.post(
  "/productlist/:page",
  bodyParser.urlencoded({ extended: true }),
  productlist
);
router.post(
  "/getsearched/:keyword",
  bodyParser.urlencoded({ extended: true }),
  serachedproductscontroller
);
router.get("/braintree/token", braintreetokencontroller);
router.post(
  "/braintree/payment",
  bodyParser.urlencoded({ extended: true }),
  isuser,
  braintreepaymentcontroller
);
export default router;
