const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const cluster = process.env.CLUSTER;
const cors = require("cors");
const main = require("./routes/main");
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());
app.use("/main", main);

async function start() {
  await mongoose.connect(cluster, { useNewUrlParser: true });

  try {
    app.listen(port, console.log(`Servers up on port ${port}`));
  } catch (err) {
    console.error(err);
  }
}

start();
