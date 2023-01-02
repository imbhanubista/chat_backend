const Message = require("../models/messages.model");

exports.saveMessage = async (data) => {
  return await (await Message.create(data)).save();
};


exports.findMessagesByChatroomId = async (id) => {
  return await Message.find({chatroom : id});
};
