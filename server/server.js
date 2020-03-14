const express = require("express");
const path = require("path");
const { sequelize } = require("./models/database");

// Database
sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch(err => console.log("Unable to connect to the database:" + err));

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "/../client/build")));

// Handles any requests
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/build/index.html"));
});

// app.use("/user", require("./routes/user"));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("App is listening on port " + port));
