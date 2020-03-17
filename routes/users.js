const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

router.post("/create", async (req, res) => {
  let { firstName, lastName, email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (user) {
      res.json({ existed: true });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    User.create({ firstName, lastName, email, password });
    res.json({ existed: false });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
