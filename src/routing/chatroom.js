const chatRoute = require("express").Router();
const { createChatRoom } = require("../controllers/chat/chatroom.controller");
const { getAllChatroom } = require("../controllers/chat/getChatroom");
const { validateInputs } = require("../utlis/middleware/validator");
const { chatValidation } = require("../validations/index");

chatRoute.post("/chat", validateInputs(chatValidation), createChatRoom);

chatRoute.get("/chatroom", getAllChatroom);

module.exports = chatRoute;
