const { Sequelize, sequelize, Model } = require("./database");
const Category = require("./Category");

class Item extends Model {}
Item.init(
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    name: { type: Sequelize.STRING, allowNull: false },
    imgUrl: { type: Sequelize.STRING, allowNull: false },
    price: { type: Sequelize.DECIMAL(5, 2), allowNull: false },
    category: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: Category,
        key: "title",
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  },
  { sequelize, modelName: "item" }
);

module.exports = Item;
