const express = require("express");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

router.post("/create", async (req, res) => {
  let { firstName, lastName, email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (user) {
    return res.json({ existed: true });
  }

  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);

  const newUser = await User.create({ firstName, lastName, email, password });
  req.login(newUser, err => {
    if (!err) {
      const { id, firstName, cart } = req.user;
      return res.json({ existed: false, user: { id, firstName, cart } });
    }
  });
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  return res.json(req.user);
});

module.exports = router;
