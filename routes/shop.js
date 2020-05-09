const express = require("express");
const { Sequelize } = require("../models/database");
const Item = require("../models/Item");
const User = require("../models/User");
const { STRIPE_SECRET_KEY } = require("../config/config");
const stripe = require("stripe")(STRIPE_SECRET_KEY);

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

router.post("/checkout", async (req, res) => {
  const { cart } = req.user;
  const newCart = JSON.parse(cart);
  const cartItemIds = Object.keys(newCart);

  let amount = 0;
  cartItemIds.forEach(cartItemId => {
    let { price, quantity } = newCart[cartItemId];
    amount = amount + price * quantity;
  });

  const { subtotal } = req.body;

  if (amount !== subtotal) {
    return res.json({ match: false });
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: subtotal * 100,
    currency: "gbp",
    metadata: { integration_check: "accept_a_payment" }
  });

  return res.json({ match: true, clientSecret: paymentIntent.client_secret });
});

router.get("/cart/empty", async (req, res) => {
  const { user } = req;
  user.cart = "{}";
  await user.save();

  return res.json([]);
});

router.post("/search", async (req, res) => {
  const { value } = req.body;

  const Op = Sequelize.Op;
  const filteredItems = await Item.findAll({ where: { name: { [Op.iLike]: `%${value}%` } } });

  const results = {};
  const priceFormat = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" });

  filteredItems.forEach(item => {
    const { name, imgUrl, price, category } = item;
    const result = { title: name, image: imgUrl, price: priceFormat.format(price), category };

    if (results[category]) {
      results[category].results.push(result);
    } else {
      results[category] = { name: category, results: [result] };
    }
  });

  res.json(results);
});

module.exports = router;
