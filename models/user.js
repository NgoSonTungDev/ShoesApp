const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      require: true,
    },
    passWord: {
      type: String,
      require: true,
    },
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: false,
    },
    address: {
      type: String,
      require: false,
    },
    avt: {
      type: String,
      require: false,
    },
    isAdmin: {
      type: Boolean,
      require: true,
      default: false,
    },
  },

  { timestamps: true }
);

const Users = mongoose.model("User", userSchema);
module.exports = Users;
