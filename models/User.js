const { Sequelize, sequelize, Model } = require("./database");

class User extends Model {}
User.init(
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    firstName: { type: Sequelize.STRING, allowNull: false },
    lastName: { type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING, allowNull: false, unique: true },
    password: { type: Sequelize.STRING, allowNull: false },
    cart: { type: Sequelize.TEXT, defaultValue: "{}" },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  },
  { sequelize, modelName: "user" }
);

module.exports = User;
