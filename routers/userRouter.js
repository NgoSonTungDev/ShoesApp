const userController = require("../controllers/userController");
const router = require("express").Router();

router.post("/add-user", userController.createUser);
router.get("/all-user", userController.getAllUser);
router.get("/an-user/:userID", userController.getAnUser);
router.patch("/update-user/:userID", userController.updateUser);
router.delete("/delete-user/:userID", userController.deleteUser);

module.exports = router;
