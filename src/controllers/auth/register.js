const {
  registerValidation,
  fullname,
} = require("../../validations/auth/registerValidation");
// common response
const { register, userAlreadyExit } = require("../../constrants/auth/auth");
const {
  errorResponse,
  successResponse,
  fileUploadError,
} = require("../../constrants/response");
const { serverError } = require("../../constrants/commonResponse");

// function to find user and create user
const { findUser, createUser } = require("../../services/userService");

exports.RegisterUser = async (req, res) => {
  const { fullname, username, email, phone, password } = req.body;
  //    email and username should be unique
  const user = await findUser({ $or: [{ email }, { username }] });
  if (user) {
    res.json({
      type: errorResponse,
      message: userAlreadyExit,
    });
    return;
  }

  // if (!req.files || Object.keys(req.files).length === 0) {
  //   res.json({
  //     type: errorResponse,
  //     message: fileUploadError,
  //   });
  //   return;
  // }

  // let profileImage = req.files.profileImage;
  // let path = `/images/userProfile/${profileImageName}`;
  // profileImage.mv("public" + path, (err) => {
  //   console.log(err);
  // });
  try {
    await createUser({
      fullname,
      username,
      email,
      phone,
      password,
      // profileImage: path,
    });
    res.json({
      type: successResponse,
      message: register,
    });
  } catch (err) {
    res.json({
      type: errorResponse,
      message: serverError,
    });
  }
};
