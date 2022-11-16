const joi = require("joi");

const CheckAddProduct = joi.object({
  productName: joi.string().min(5).max(100).required(),
  productBrand: joi.string().required(),
  type: joi.string().required(),
  info: joi.string(),
  price: joi.number().required(),
  discount: joi.number(),
  quantity: joi.number().required(),
  images: joi.array().min(1).required(),
});

const checkUserSchema = joi.object({
  userName: joi.string().min(5).max(30).required(),
  passWord: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  firstName: joi.string().min(2).max(100).required(),
  lastName: joi.string().min(2).max(100).required(),
  phone: joi.string().max(10).required(),
  email: joi.string().email().allow(""),
  address: joi.string().min(10).max(200).allow(""),
  avt: joi.string().allow(""),
});

module.exports = { CheckAddProduct, checkUserSchema };
