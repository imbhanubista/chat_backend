const { findUser } = require("../../services/userService");

exports.getUserById = async (req, res) => {
  const { id } = req.body;
  try {
    const user = await findUser({ _id: id });
    res.json({
      type: successResponse,
      message: user,
    });
  } catch (err) {
    res.json({
      type: errorResponse,
      message: err.message,
    });
  }
};
