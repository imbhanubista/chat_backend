const joi = require("joi");
const { errorResponse } = require("../../constrants/response");

exports.validateInputs = (schema) => {
  return (req, res, next) => {
    const data =
      req.method === "GET"
        ? { ...req.query, ...req.params }
        : { ...req.body, ...req.params };
    const { error } = schema.validate(data, {
      errors: { wrap: { label: "" } },
    });
    if (error) {
      res.json({
        type: errorResponse,
        message: error.details[0].message,
      });
      return;
    }
    next();
  };
};
