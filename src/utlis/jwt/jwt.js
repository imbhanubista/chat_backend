const jwt = require("jsonwebtoken");
const { inValidToken } = require("../../constrants/auth/auth");
const { errorResponse, successResponse } = require("../../constrants/response");
const jwtSecret = process.env.JWT_SECRET;
const jwtExpire = process.env.JWT_EXPIRES_IN;

// function to sign jwt token
const signToken = (data, secret, expire) => {
  return jwt.sign(data, secret, { expiresIn: expire });
};

exports.signAccessToken = (data) => {
  return signToken(data, jwtSecret, jwtExpire);
};

// function to verify jwt token
exports.isLogin = async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token || token.length < 1 || token === "") {
    return res.json({
      type: errorResponse,
      message: inValidToken,
    });
    return;
  }
  token = token.split(" ");
  let actualToken = token[1];
  if (!actualToken || actualToken.length < 1 || actualToken === "") {
    return res.json({
      type: errorResponse,
      message: inValidToken,
    });
    return;
  }
  const tokenDetails = verifyJwtToken(actualToken);
  if (tokenDetails.type === successResponse) {
    req.isLoggedInData = tokenDetails;
    next();
    return;
  }
  return res.json(tokenDetails);
};

const verifyJwtToken = (token) => {
  try {
    let verifiedToken = jwt.verify(token, jwtSecret);
    return {
      type: successResponse,
      data: {
        verifiedToken,
      },
    };
  } catch (err) {
    return {
      type: successResponse,
      message: inValidToken,
    };
  }
};

exports.verifyJwtToken = verifyJwtToken;
