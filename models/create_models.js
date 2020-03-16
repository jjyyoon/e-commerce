const { sequelize } = require("./database");
const { User } = require("./User");

User.sync({ force: false }).then(() => console.log("Created the user table"));

// It would be better to use 'sequelize.sync();', but I haven't figured out how to use it yet.
