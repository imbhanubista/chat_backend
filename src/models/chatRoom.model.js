const { Schema, model } = require("mongoose");

const chatRoomSchema = new Schema(
  {
    name: {
      type: String,
      required: "Chatroom name shouldn't be empty",
    },
    username: {
      type: String,
      required: "Username shouldn't be empty",
      unique: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("ChatRoom", chatRoomSchema);
