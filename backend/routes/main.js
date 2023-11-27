const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const multer = require("multer");
const upload = multer({ dest: "./public/data/uploads/" });

router
  .route("/")
  .get(userController.GetUsers)
  .post(upload.single("photo"), userController.CreateUser);

router
  .route("/:id")
  .post(userController.DeleteUser)
  .put(userController.UpdateUser);

router.route("/:search").post(userController.FindByUsername);

module.exports = router;
