const express = require("express");
const Item = require("../models/Item");
const User = require("../models/User");

const router = express.Router();

router.get("/load/:category", async (req, res) => {
  const { category } = req.params;
  const items = await Item.findAll({ where: { category } });
  return res.json(items);
});

router.post("/add", async (req, res) => {
  try {
    if (!req.user) {
      return res.json({ loggedIn: false });
    }

    const { user } = req;
    const newCart = JSON.parse(user.cart);
    const itemToAdd = req.body.id;

    if (!newCart[itemToAdd]) {
      newCart[itemToAdd] = 1;
    } else {
      newCart[itemToAdd] = newCart[itemToAdd] + 1;
    }

    user.cart = JSON.stringify(newCart);
    await user.save();

    return res.json({ loggedIn: true, cart: newCart });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
