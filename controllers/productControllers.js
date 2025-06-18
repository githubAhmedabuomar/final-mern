import fs from "fs";
import productmodel from "../models/Productmodel.js";
import slugify from "slugify";
import categorymodel from "../models/Categorymodel.js";
import dotenv from "dotenv";

import Ordermodel from "../models/Ordermodel.js";
import braintree from "braintree";
dotenv.config();

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "jby4fnkzgm9yfjm6",
  publicKey: "rbt2yftm3vpjc3dh",
  privateKey: "11f3afbc3fecab3a1075ebbcc3c8ea78",
});
export const createproductcontroller = async (req, res, next) => {
  try {
    const { name, description, slug, quantity, price, shipping, category } =
      req.fields;
    const { photo } = req.files;
    const product = new productmodel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(200).send({
      success: true,
      mess: "product created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error,
      mess: "something went wrong in creating anew product",
    });
  }
};
export const getallProductscontroller = async (req, res, next) => {
  try {
    const products = await productmodel.find({});
    console.log(products, "products from server");
    res.status(200).send({
      success: true,
      products,
      mess: "all products get successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      mess: "error in getting products",
    });
  }
};
export const getproductphotocontroller = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productmodel.findById(id).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        mess: "error in getting product photo",
      });
  }
};
export const getsingleproductcontroller = async (req, res, next) => {
  try {
    const product = await productmodel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    console.log(product, "product from get single");
    res.status(200).send({
      product,
      success: true,
      mess: "Single Product Fetched",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      mess: "error in getting the product",
    });
  }
};

export const updateproductcontroller = async (req, res) => {
  try {
    const { name, price, description, quantity, shipping, id, category } =
      req.fields;
    const { photo } = req.files;

    const product = await productmodel
      .findById(id)
      .select("-photo")
      .populate("category");

    product.description = description;
    product.name = name;
    product.category = category;
    product.quantity = quantity;
    product.price = price;
    product.shipping = shipping;
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();
    res.status(200).send({ product });
  } catch (error) {
    console.log(error);
  }
};
export const deleteproductcontroller = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, "id from delete");
    const product = await productmodel.findByIdAndDelete(id);
    res.status(200).send({ mess: "product deleted successfuly", product });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error,
      mess: "error while deleting item",
    });
  }
};
export const filteredproducts = async (req, res) => {
  try {
    const params = {};
    const { checked, radio } = req.body;
    console.log(checked, "checked from server");
    console.log(radio, "radio from server");

    if (checked.length) params.category = checked;
    if (radio && radio.length)
      params.price = { $gte: radio[0], $lte: radio[1] };
    console.log(params.price, "price");
    const products = await productmodel.find(params);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
  }
};
export const productscount = async (req, res) => {
  try {
    const count = await productmodel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      count,
      mess: "get count successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
export const productlist = async (req, res) => {
  try {
    const perpage = 3;
    const page = req.params.page ? req.params.page : 1;
    console.log(req.params.page, "page from server");
    const products = await productmodel
      .find({})
      .limit(perpage)
      .skip(perpage * (page - 1))
      .sort({ createdAt: -1 })
      .select("-photo");

    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error });
  }
};
export const serachedproductscontroller = async (req, res) => {
  try {
    const { keyword } = req.params;
    console.log(keyword, "keyword from  server");
    const products = await productmodel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    console.log(products, "products from search");
    // res.status(200).send({
    //   products,
    //   success: true,
    // });
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error,
      success: false,
    });
  }
};
export const getsimilarproductscontroller = async (req, res) => {
  try {
    console.log(req.params.slug);
    const product = await productmodel
      .findOne({ slug: req.params.slug })
      .select("-photo");
    console.log(product, "product from similar products");
    const products = await productmodel
      .find({ category: product.category, _id: { $ne: product._id } })
      .select("-photo");

    console.log(products, "similar productsssss");
    res.status(200).send({ products });
  } catch (error) {
    console.log(error);
  }
};
export const getcategoryproducts = async (req, res) => {
  try {
    const category = await categorymodel.findOne({ slug: req.params.slug });
    console.log(category, "category from get cp");
    const products = await productmodel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      products,
      category,
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        error,
      });
  }
};
export const braintreetokencontroller = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
export const braintreepaymentcontroller = async (req, res) => {
  try {
    const { cart, total } = req.body;
    console.log(total, "totallllll");
    const order = new Ordermodel({
      products: cart,
      buyer: req.user._id,
      total: total,
    }).save();

    res.status(200).send({
      success: true,
      order,
    });
  } catch (error) {
    console.log(req._id, "userr");
    console.log(error);
    res.status(500).send({
      success: false,
      error,
    });
  }
};
