const Category = require("../models/categoryModel");

const categoryCtrl = {
  // Take infor Category
  getCategories: async (req, res) => {
    // res.json({ msg: "Category show here" });
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  // Create a new Category
  createCategory: async (req, res) => {
    try {
      // if role = 1 --> admin
      // only admin can change category
      const { name } = req.body;
      const category = await Category.findOne({ name });

      if (category)
        // Check if category exists
        return res.status(400).json({ msg: "This category already exists" });

      const newCategory = new Category({ name });

      await newCategory.save();
      res.json({ msg: "Create a category" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  // Delete Category selected
  deleteCategory: async (req, res) => {
    try {
      await Category.findByIdAndDelete(req.params.id);
      res.json({ msg: "Category deleted" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { name } = req.body;
      await Category.findOneAndUpdate({ _id: req.params.id }, { name });
      res.json({ msg: "Category updated" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = categoryCtrl;
