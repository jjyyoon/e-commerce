const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const passportConfig = passport => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ where: { email } });

          if (user && (await bcrypt.compare(password, user.password))) {
            const { id, firstName, cart } = user;
            return done(null, { id, firstName, cart });
          }

          return done(null, false);
        } catch (err) {
          console.log(`An error occurred during signing in (${err})`);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    console.log("#serializeUser");
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    console.log("#deserializeUser");
    try {
      const user = await User.findOne({ where: { id } });

      if (user) {
        done(null, user);
      }
    } catch (err) {
      console.log(`An error occurred during deserializing (${err})`);
    }
  });
};

module.exports = passportConfig;
