const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
  {
    chatroom: {
      type: Schema.Types.ObjectId,
      required: "Chatroom is required",
      ref: "ChatRoom",
    },
    user: {
      type: Schema.Types.ObjectId,
      required: "User is required",
      ref: "User",
    },
    message: {
      type: String,
      required: "Message is required",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Message", messageSchema);
