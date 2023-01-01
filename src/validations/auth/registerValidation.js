const joi = require("joi");

module.exports = joi.object({
  fullname: joi.string().min(6).max(30).required(),
  username: joi.string().min(3).max(15).required(),
  email: joi.string().email().required(),
  phone: joi.string().min(10).max(10).required(),
  password: joi.string().min(6).max(15).required(),
});
