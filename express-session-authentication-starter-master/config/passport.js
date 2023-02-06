const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const connection = require("./database");
const User = connection.models.User;
const verifyPassword = require("../lib/passwordUtils").validPassword;

// TODO: passport.use();
// const customFields = {
//   usernameField: "uname",
//   passwordField: "pw",
// };

const verifyCallback = function (username, password, done) {
  User.findOne({ username: username }, function (err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }
    if (!verifyPassword(password, user.hash, user.salt)) {
      return done(null, false);
    }
    return done(null, user);
  });
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});
