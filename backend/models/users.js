const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      default: "",
    },
    password: {
      type: String,
      required: true,
      trim: true,
      default: "",
    },
    mail: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("chats", userSchema);
module.exports = userModel;
