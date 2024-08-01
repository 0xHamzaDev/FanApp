const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const morgan = require("morgan");
const helmet = require("helmet");

const App = express();

App.use(cors());
App.use(helmet());
App.use(morgan("dev"));
App.use(bodyParser.json());

App.use("/auth", authRoutes);

App.get("/", (req, res) => {
  res.send("Hello, this is the fan app backend!");
});

module.exports = App;
