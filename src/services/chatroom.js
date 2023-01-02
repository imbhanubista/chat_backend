const ChatRoom = require("../models/chatRoom.model");

// to create the chatroom service

exports.createChatRoom = async (data) => {
  return await (await ChatRoom.create(data)).save();
};

// find the name of the chatroom
exports.findChatRoomByName = async (name) => {
  return await ChatRoom.findOne({ name });
};
exports.findChatroomWithCustomCondition = async (condition)=>{
  return await ChatRoom.findOne(condition)
}

// get all the chatrooms from the database
exports.getAllChatRooms = async () => {
  return await ChatRoom.find().sort("-_id");
};
