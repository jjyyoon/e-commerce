const express = require("express");
const session = require("express-session");
const path = require("path");
const passport = require("passport");

const app = express();

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Middleware
app.use(express.static(path.join(__dirname, "client/build")));
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// Connect to PostgreSQL
const { sequelize } = require("./models/database");
sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch(err => console.log("Unable to connect to the database:" + err));

// Passport Config
const passportConfig = require("./config/passport");
passportConfig(passport);

// Routes
app.use("/users", require("./routes/users"));
app.use("/shop", require("./routes/shop"));

// Handles any requests
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(process.env.PORT, () => {
  console.log("App is listening on port " + process.env.PORT);
});
