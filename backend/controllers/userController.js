const dataModel = require("../models/users");
const bcrypt = require("bcrypt");

async function GetUsers(req, res) {
  try {
    const users = await dataModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function CreateUser(req, res) {
  try {
    const { username, password, mail } = req.body;

    if (!username || !password || !mail)
      return res.status(400).json({ Alert: "Fields not filled" });

    const crossVerify = await dataModel.find({
      $or: [{ username: username }, { mail: mail }],
    });

    let photofilename;
    if (req.file) {
      photofilename = `${Date.now()}.jpeg`;
    }

    if (crossVerify.length === 0) {
      const hashedPWD = bcrypt.hashSync(password, 10);
      const saveUser = new dataModel({
        username,
        photo: photofilename,
        password: hashedPWD,
        mail: mail.toLowerCase(),
      });

      await saveUser.save();
      return res.status(201).json({ Alert: `${username} Created` });
    } else {
      return res
        .status(409)
        .json({ Alert: `${username} or ${mail} already exists` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function DeleteUser(req, res) {
  const { id } = req.body;

  if (!id) return res.status(400).json({ Alert: "ID not provided" });

  const findbyID = await dataModel.findOne({ _id: id });

  if (!findbyID) {
    return res.status(400).json({ Alert: `User with ID ${id} not found` });
  } else {
    await dataModel.deleteOne({ _id: convertInt });
    return res.status(200).json({ Alert: `User ${id} deleted` });
  }
}

module.exports = { CreateUser, GetUsers, DeleteUser };
