import categorymodel from "../models/Categorymodel.js";
import slugify from "slugify";
import usermodel from "../models/usermodel.js";
export const createCategory = async (req, res, next) => {
  try {
    const { categoryname } = req.body;
    if (!categoryname) {
      return res.status(301).send({ mess: "enter category name" });
    }
    const excistingCategory = await categorymodel.findOne({
      name: categoryname,
    });
    if (excistingCategory) {
      return res.status(200).send({ mess: "the category is already excists" });
    }

    const slug = slugify(categoryname);
    const category = new categorymodel({
      name: categoryname,
      slug: slug,
    }).save();
    res.status(200).send({
      success: true,
      category: {
        name: category.name,
        slug: category.slug,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
    });
  }
};
export const getallCategories = async (req, res, next) => {
  try {
    const categories = await categorymodel.find({});
    console.log(categories, "CATEGORIES");
    res.status(200).send({
      success: true,
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
    });
  }
};
export const deletecategorycontroller = async (req, res, next) => {
  try {
    const { name } = req.params;
    const category = await categorymodel.findOne({ name });
    await categorymodel.findByIdAndDelete(category._id);
    res.status(200).send({
      success: true,
      mess: "category deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      mess: "error in deleting",
    });
  }
};
export const updatecategorycontroller = async (req, res) => {
  try {
    const { id } = req.params;
    const { newname } = req.body;
    console.log(id, newname, "from update category");
    const category = await categorymodel.findByIdAndUpdate(
      id,
      { name: newname },
      { new: true }
    );
    console.log(category, "category from update");
    await category.save();
    res.status(200).send({
      success: true,
      mess: "category updated successfully",
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        mess: "error in updating category",
        error,
      });
  }
};
