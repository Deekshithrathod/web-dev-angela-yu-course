const crypto = require("crypto");

// TODO
function validPassword(password, hash, salt) {
  const hashedPassword = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return hashedPassword === hash;
}
function genPassword(password) {
  const salt = crypto.randomBytes(32).toString("hex");
  const hashedPassword = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return {
    salt,
    hash: hashedPassword,
  };
}

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
