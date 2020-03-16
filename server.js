const express = require("express");
const path = require("path");
const { sequelize } = require("./models/database");

// Database
sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch(err => console.log("Unable to connect to the database:" + err));

const app = express();

app.use(express.json());

// Use Routes
app.use("/users", require("./routes/users"));

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// Handles any requests
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("App is listening on port " + port));
