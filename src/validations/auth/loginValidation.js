const joi = require("joi");

module.exports = joi.object({
  username: joi.string().min(3).max(15).required(),
  password: joi.string().min(6).max(15).required(),
});
