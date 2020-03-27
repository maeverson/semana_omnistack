const crypto = require("crypto");

module.exports = function generateUUID(length) {
  return crypto.randomBytes(length).toString("HEX");
};
