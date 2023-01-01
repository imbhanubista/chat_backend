const { serverError } = require("../../constrants/commonResponse");
const { errorResponse, successResponse } = require("../../constrants/response");
const { getAllChatRooms } = require("../../services/chatroom");

exports.getAllChatroom = async (req, res) => {
  try {
    const chatrooms = await getAllChatRooms();
    res.json({
      type: successResponse,
      message: "Available chatrooms",
      data: chatrooms,
    });
  } catch (err) {
    res.json({
      type: errorResponse,
      message: serverError,
    });
  }
};
