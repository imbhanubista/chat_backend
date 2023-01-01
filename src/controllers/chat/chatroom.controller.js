const {
  createChatRoom,
  findChatRoomByName,
} = require("../../services/chatroom");
const {
  successResponse,
  errorResponse,
  chatRoomCreated,
  chatRoomAlreadyExists,
  fileUploadError,
} = require("../../constrants/response");

exports.createChatRoom = async (req, res) => {
  const { name, username, description } = req.body;
  // find chatroom by name and username
  const chatRoom = await findChatRoomByName({ $or: [{ name }, { username }] });
  if (chatRoom) {
    res.json({
      type: errorResponse,
      message: chatRoomAlreadyExists,
    });
    return;
  }
  if (!req.files || Object.keys(req.files).length === 0) {
    res.json({
      type: errorResponse,
      message: fileUploadError,
    });
    return;
  }
  let profile = req.files.profile;
  let path = `/images/chatprofile/${profile.name}`;
  profile.mv("public" + path, (err) => {
    console.log(err);
  });

  try {
    await createChatRoom({ name, profile: path, username, description });
    res.json({
      type: successResponse,
      message: chatRoomCreated,
    });
  } catch (err) {
    res.json({
      type: errorResponse,
      message: err.message,
    });
  }
};
