const joi = require("joi");

module.exports = joi.object({
  name: joi.string().required(),
  username: joi.string().required(),
  image: joi.string(),
  description: joi.string(),
});
