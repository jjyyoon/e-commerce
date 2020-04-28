const express = require("express");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

const createUserInfo = (user) => {
  let { id, firstName, lastName, email, cart } = user;
  cart = JSON.parse(cart);
  return { id, firstName, lastName, email, cart };
};

router.post("/create", async (req, res) => {
  let { firstName, lastName, email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (user) {
    return res.json({ exist: true });
  }

  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);

  const newUser = await User.create({ firstName, lastName, email, password });
  req.login(newUser, (err) => {
    if (!err) {
      const user = createUserInfo(req.user);
      return res.json({ exist: false, user });
    }
  });
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  return res.json(req.user);
});

router.get("/auth", (req, res) => {
  if (!req.user) {
    return res.json(null);
  }

  const user = createUserInfo(req.user);
  return res.json(user);
});

module.exports = router;
