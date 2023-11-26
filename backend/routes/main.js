const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const multer = require("multer");
const upload = multer({ dest: "./public/data/uploads/" });

router
  .route("/")
  .get(userController.GetUsers)
  .post(upload.single("photo"), userController.CreateUser)
  .delete(userController.DeleteUser);

module.exports = router;
