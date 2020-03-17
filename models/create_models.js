const { sequelize } = require("./database");
const User = require("./User");
const Category = require("./Category");
const Item = require("./Item");

const categories = require("./category.data");
const items = require("./item.data");

// Sync all models at once.
// Note: using `force: true` will drop the table if it already exists
sequelize.sync({ force: true }).then(() => {
  categories.forEach(category => {
    const { title, imgUrl } = category;
    Category.create({ title, imgUrl });
  });

  items.forEach(item => {
    const { name, imgUrl, price, category } = item;
    Item.create({ name, imgUrl, price, category });
  });
});

// You can call sync() for every model.
// User.sync({ force: false }).then(() => console.log("Created the user table"));
