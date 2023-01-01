const {
  notUser,
  inCorrectUsernameOrPassword,
  login,
} = require("../../constrants/auth/auth");
const bcrypt = require("bcrypt");
const { serverError } = require("../../constrants/commonResponse");

const { findUser } = require("../../services/userService");
const { errorResponse, successResponse } = require("../../constrants/response");
const { signAccessToken } = require("../../utlis/jwt/jwt");

// function to login user
exports.LoginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await findUser({ username });
  try {
    if (!user) {
      return res.json({
        type: errorResponse,
        message: notUser,
      });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        type: errorResponse,
        message: inCorrectUsernameOrPassword,
      });
      return;
    }
    const jwt = signAccessToken({
      user_id: user._id,
    });
    res.json({
      type: successResponse,
      message: login,
      data: {
        userId: user._id,
        jwt,
      },
    });
  } catch (err) {
    res.json({
      type: errorResponse,
      message: serverError,
    });
  }
};
