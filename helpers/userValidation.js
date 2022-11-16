const joi = require("joi");
const errFunction = require("../utils/errorFunction");

const checkUserSchema = joi.object({
  userName: joi.string().trim().min(5).max(30).required(),
  passWord: joi
    .string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .trim(),
  firstName: joi.string().min(2).max(100).required().trim(),
  lastName: joi.string().min(2).max(100).required().trim(),
  phone: joi
    .string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required()
    .trim(),
  email: joi.string().email().allow("").trim(),
  address: joi.string().min(10).max(200).allow("").trim(),
  avt: joi.string().allow("").trim(),
  isAdmin: joi.boolean,
});

const userValidation = async (req, res, next) => {
  const { error } = checkUserSchema.validate(req.body);
  if (error) {
    res.status(406);
    return res.json(errFunction(true, `Error in user data : ${error.message}`));
  } else {
    next();
  }
};

module.exports = userValidation;
