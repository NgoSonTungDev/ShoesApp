const express = require("express");
const userController = require("../controllers/userController");
const allowCrossDomain = require("../utils/corsMiddleware");
const userValidation = require("../helpers/userValidation");
const router = require("express").Router();
const app = express();
app.use(allowCrossDomain);

router.post("/add-user", userValidation, userController.createUser);
router.post("/login-user", userController.loginUser);
router.get("/all-user", userController.getAllUser);
router.get("/an-user/:userID", userController.getAnUser);
router.patch("/update-user/:userID", userController.updateUser);
router.delete("/delete-user/:userID", userController.deleteUser);

module.exports = router;
