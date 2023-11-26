const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router
  .route("/")
  .get(userController.GetUsers)
  .post(userController.CreateUser)
  .delete(userController.DeleteUser);

module.exports = router;
