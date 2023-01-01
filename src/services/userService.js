const User = require("../models/user.model");

// function to find user
exports.findUser = async (condition) => {
  return await User.findOne(condition);
};

// function to create user
exports.createUser = async (data) => {
  return await (await User.create(data)).save();
};
