const router = require("express").Router();
const authRouter = require("./auth");
const chatRoute = require("./chatroom");
const { isLogin } = require("../utlis/jwt/jwt");

router.use("/user", authRouter);
router.use("/auth", isLogin, chatRoute);

module.exports = router;
