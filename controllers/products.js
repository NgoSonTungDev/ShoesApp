const Products = require("../models/products");
const CheckAddProductSchema = require("../helpers/validation");
// CRUD
// CREATE - POST
const createProduct = async (req, res, next) => {
  try {
    const validReg = await CheckAddProductSchema.CheckAddProduct.validateAsync(
      req.body
    );
    // let product = new Products(req.body);
    let product = new Products(validReg);
    product.save().then((response) => {
      res.json({
        message: "Added product successfully!",
      });
    });
  } catch (error) {
    console.log("err : ", error);
    return res.status(400).json({
      statusCode: 400,
      message: "Bad request",
      errors: error.details[0].message,
    });
  }
};

// READ - GET || POST

//Get all
const getAllProduct = async (req, res, next) => {
  try {
    const allProduct = await Products.find();
    const totalProduct = (await Products.find()).length;
    if (allProduct.length > 0) {
      res.status(200).json({
        total: totalProduct,
        products: allProduct.reverse(),
      });
    } else {
      res.status(200).json({
        message: "No results",
        products: [],
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      statusCode: 400,
      message: "Bad request",
    });
  }
};

//Get an product by id
const getAnProduct = async (req, res, next) => {
  const ProductID = await Products.findById(req.params.productId);
  if (!ProductID)
    return res.status(400).json({
      statusCode: 400,
      message: "This product Id have not in the database",
      products: {},
    });
  try {
    return res.status(200).json({
      products: ProductID,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      statusCode: 400,
      message: "Bad request",
    });
  }
};

// UPDATE - PUT || PATCH

const updateProduct = async (req, res, next) => {
  const ProductID = await Products.findById(req.params.productId);
  if (!ProductID)
    return res.status(400).json({
      statusCode: 400,
      message: "This product Id have not in the database",
      products: {},
    });
  if (req.body.constructor === Object && Object.keys(req.body).length === 0)
    return res.status(403).json({
      statusCode: 403,
      message: "body equal empty",
    });
  try {
    Products.findByIdAndUpdate(ProductID, req.body).then((data) => {
      if (data) {
        return res.status(200).json({
          statusCode: 200,
          message: "Update success fully",
        });
      } else {
        return res.status(204).json({
          statusCode: 204,
          message: "error",
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      statusCode: 400,
      message: "Bad request",
    });
  }
};

// DELETE - DELETE
const deleteProduct = async (req, res, next) => {
  const ProductID = await Products.findByIdAndDelete(req.params.productId);
  if (!ProductID)
    return res.status(400).json({
      statusCode: 400,
      message: "This product Id have not in the database",
      products: {},
    });
  try {
    return res.status(200).json({
      message: "Delete successfullly",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      statusCode: 400,
      message: "Bad request",
    });
  }
};

module.exports = {
  createProduct,
  getAllProduct,
  getAnProduct,
  deleteProduct,
  updateProduct,
};
