const Users = require("../models/user");
const checkUserSchema = require("../helpers/validation");

const createUser = async (req, res, next) => {
  try {
    const validReg = await checkUserSchema.checkUserSchema.validateAsync(
      req.body
    );
    let user = new Users(validReg);
    user.save().then((response) => {
      res.json({
        message: "Added user successfully!",
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

//Get all
const getAllUser = async (req, res, next) => {
  try {
    const allUser = await Users.find();
    const totalUser = (await Users.find()).length;
    if (allUser.length > 0) {
      res.status(200).json({
        total: totalUser,
        Users: allUser.reverse(),
      });
    } else {
      res.status(200).json({
        message: "No results",
        Users: [],
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

//Get an User by id
const getAnUser = async (req, res, next) => {
  const userID = await Users.findById(req.params.userID);
  if (!userID)
    return res.status(400).json({
      statusCode: 400,
      message: "This user Id have not in the database",
      Users: {},
    });
  try {
    return res.status(200).json({
      data: userID,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      statusCode: 400,
      message: "Bad request",
    });
  }
};
const updateUser = async (req, res, next) => {
  const UserID = await Users.findById(req.params.UserID);
  if (!UserID)
    return res.status(400).json({
      statusCode: 400,
      message: "This User Id have not in the database",
      Users: {},
    });
  if (req.body.constructor === Object && Object.keys(req.body).length === 0)
    return res.status(403).json({
      statusCode: 403,
      message: "body equal empty",
    });
  try {
    Users.findByIdAndUpdate(UserID, req.body).then((data) => {
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
const deleteUser = async (req, res, next) => {
  const userID = await Users.findByIdAndDelete(req.params.userID);
  if (!userID)
    return res.status(400).json({
      statusCode: 400,
      message: "This User Id have not in the database",
      Users: {},
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
  createUser,
  getAllUser,
  getAnUser,
  deleteUser,
  updateUser,
};
