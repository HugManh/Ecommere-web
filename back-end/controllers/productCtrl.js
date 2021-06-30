const Products = require("../models/productsModel");

// Filter, sortings and paginating
class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString }; //queryString = req.query
    // console.log({ before: queryObj }); // before delete page
    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);
    // console.log({ after: queryObj }); // after delete page

    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );

    // gte = greater than of equal >=
    // lte = lesser than of equal <=
    // lt = lesser than <
    // gt = greater than >

    // console.log({ queryObj, queryStr });

    this.query.find(JSON.parse(queryStr));

    return this;
  }
  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.page * 1 || 2; // the number of a page
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

const productCtrl = {
  getProducts: async (req, res) => {
    try {
      // const products = await Products.find();
      console.log(req.query);

      const features = new APIfeatures(Products.find(), req.query)
        .filtering()
        .sorting()
        .paginating();
      const products = await features.query;
      // res.json(products);
      res.json({
        status: "success",
        result: products.length, //the number of products
        products: products,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  createProducts: async (req, res) => {
    try {
      const {
        product_id,
        title,
        price,
        description,
        content,
        images,
        category,
      } = req.body;

      if (!images) return res.status(400).json({ msg: "No image found" });

      const product = await Products.findOne({ product_id });
      if (product)
        return res.status(400).json({ msg: "This product already exists" });

      const newProduct = new Products({
        product_id,
        title: title.toLowerCase(),
        price,
        description,
        content,
        images,
        category,
      });
      await newProduct.save();

      res.json({ msg: "Create a new Product" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  deleteProducts: async (req, res) => {
    try {
      await Products.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted a Product" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  updateProducts: async (req, res) => {
    try {
      const { title, price, description, content, images, category } = req.body;

      if (!images) return res.status(400).json({ msg: "No images found" });

      await Products.findByIdAndUpdate(
        { _id: req.params.id },
        {
          title: title.toLowerCase(),
          price,
          description,
          content,
          images,
          category,
        }
      );

      res.json({ msg: "Update a Product" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = productCtrl;
