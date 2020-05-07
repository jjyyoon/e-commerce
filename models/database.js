const { DATABASE_URI } = require("../config/config");
const { username, password, host, port, databaseName } = DATABASE_URI;

const Sequelize = require("sequelize");
const Model = Sequelize.Model;

const sequelize = new Sequelize(
  `postgres://${username}:${password}@${host}:${port}/${databaseName}`,
  {
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

module.exports = { Sequelize, Model, sequelize };
