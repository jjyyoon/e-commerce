const { Sequelize, sequelize, Model } = require("./database");

class Category extends Model {}
Category.init(
  {
    title: { type: Sequelize.STRING, allowNull: false, unique: true },
    imgUrl: { type: Sequelize.STRING, allowNull: false },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  },
  { sequelize, modelName: "category" }
);

module.exports = Category;
