const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const cluster = process.env.CLUSTER;
const cors = require("cors");
const main = require("./routes/main");
const mongoose = require("mongoose");
const { join } = require("path");

app.use(express.json());
app.use(cors());
app.use("/main", main);

app.use("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ Alert: "404 Error" });
  } else {
    res.type("txt").send("404 Error");
  }
});

async function start() {
  await mongoose.connect(cluster, { useNewUrlParser: true });

  try {
    app.listen(port, console.log(`Servers up on port ${port}`));
  } catch (err) {
    console.error(err);
  }
}

start();
