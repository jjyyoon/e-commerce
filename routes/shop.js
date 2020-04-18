const express = require("express");
const Item = require("../models/Item");
const User = require("../models/User");

const router = express.Router();

router.get("/load/:category", async (req, res) => {
  const { category } = req.params;
  const items = await Item.findAll({ where: { category } });
  return res.json(items);
});

router.post("/cart/add", async (req, res) => {
  try {
    const { user } = req;
    const newCart = JSON.parse(user.cart);
    const { id, name, imgUrl, price } = req.body.item;

    if (!newCart[id]) {
      newCart[id] = { name, imgUrl, price, quantity: 1 };
    } else {
      newCart[id].quantity = newCart[id].quantity + 1;
    }

    user.cart = JSON.stringify(newCart);
    await user.save();

    return res.json(newCart);
  } catch (err) {
    console.log(err);
  }
});

router.get("/cart", (req, res) => {
  const cart = JSON.parse(req.user.cart);
  return res.json(cart);
});

router.post("/cart/update", async (req, res) => {
  try {
    const { user } = req;
    const newCart = JSON.parse(user.cart);
    let { id, newQty } = req.body;

    if (newQty === 0) {
      delete newCart[id];
    } else {
      newCart[id].quantity = newQty;
    }

    user.cart = JSON.stringify(newCart);
    await user.save();

    return res.json(newCart);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
