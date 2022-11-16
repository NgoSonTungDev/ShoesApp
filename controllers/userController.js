const Users = require("../models/user");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const checkUserSchema = require("../helpers/validation");
const securePassword = require("../utils/securePassword");
const errFunction = require("../utils/errorFunction");

const createUser = async (req, res, next) => {
  const username = await Users.findOne({
    userName: req.body.userName,
  });
  const email = await Users.findOne({
    email: req.body.email,
  });
  if (username) return res.status(400).json({ msg: "Tên đã tồn tại" });
  if (email) return res.status(400).json({ msg: "Email đã tồn tại" });
  try {
    const hashPassword = await securePassword(req.body.passWord);
    const newUser = await Users.create({
      userName: req.body.userName,
      passWord: hashPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      avt: req.body.avt,
      isAdmin: req.body.isAdmin,
    });
    if (newUser) {
      return res.json(errFunction(false, "add user successfully", newUser));
    } else {
      return res.json(errFunction(true, "error creating user"));
    }
  } catch (error) {
    console.log("err : ", error);
    return res.status(400).json({
      statusCode: 400,
      message: "Bad request",
      errors: error.details[0].message,
    });
  }
};

//login

const loginUser = async (req, res, next) => {
  try {
    var username = req.body.username;
    var password = req.body.password;
    // username = 'admin'
    Users.findOne({ userName: username }).then(
      // Users.findOne({ $or: [{ email: username }, { phone: username }] }).then(
      (user) => {
        if (user) {
          bcrypt.compare(password, user.passWord, function (err, result) {
            if (err) {
              res.json(errFunction(true, 400, "Bad Request"));
            }
            if (result) {
              let access_token = jwt.sign(
                { name: username, isAdmin: user.isAdmin },
                "secretValue",
                {
                  expiresIn: "1h",
                }
              );
              res.json({
                message: "Login Successfully!",
                access_token,
                userId: user._id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                isAdmin: user.isAdmin,
                phone: user.phone,
                address: user.address,
                avatar: user.avatar,
              });
            } else {
              res.json(errFunction(true, "Password does not matched!"));
            }
          });
        } else {
          res.json(errFunction(true, "No user found!"));
        }
      }
    );
  } catch (error) {
    res.json(errFunction(true, "Bad Request"));
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
  loginUser,
};
