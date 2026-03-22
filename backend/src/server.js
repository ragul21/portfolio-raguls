const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({ message: "server is running" });
});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database server working and started");
    app.listen(port, () => {
      console.log(`server started successfully at ${port}`);
    });
  } catch (err) {
    console.log("Database connection failed ", err.message);
  }
};

startServer();
