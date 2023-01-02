const Message = require("../models/messages.model");

exports.saveMessage = async (data) => {
  return await (await Message.create(data)).save();
};


exports.findMessagesByChatroomId = async (chatroomId) => {
  return await Message.find({ chatroomId });
};
