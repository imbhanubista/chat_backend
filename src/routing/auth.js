const authRouter = require("express").Router();
const { RegisterUser } = require("../controllers/auth/register");
const { LoginUser } = require("../controllers/auth/login");
const { validateInputs } = require("../utlis/middleware/validator");

// validations
const { registerValidation, loginValidation } = require("../validations/index");

// register user
// swagger documentation
/**
 *  @swagger
 * /user/register:
 *  post:
 *  description: This is a POST request to register user
 *
 *
 */
authRouter.post("/register", validateInputs(registerValidation), RegisterUser);

// login user
authRouter.post("/login", validateInputs(loginValidation), LoginUser);

module.exports = authRouter;
