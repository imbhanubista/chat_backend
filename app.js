const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3030;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require("cors");
app.use(cors());

const { saveMessage } = require("./src/services/message");
const { findUser } = require("./src/services/userService");
const { verifyJwtToken } = require("./src/utlis/jwt/jwt");

// socket
const { Server } = require("socket.io");
const http = require("http");
const server = http.createServer(app);

// to create the new instance of the server
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// to detect the connection
io.on("connection", (socket) => {
  console.log("connected", socket.id);
  //   console.log("connected" + socket.isLoggedInData);
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log("joined" + data);
  });

  socket.on("leave_room", (data) => {
    socket.leave(data);
    console.log("left" + data);
  });

  socket.on("send_message", (data) => {
    console.log(data, "is here any data");
    // verify jwt token
    const userDetail = verifyJwtToken(data.token);
    console.log(userDetail, "is here any userDetail");

    saveMessage({
      chatroom: data.roomId,
      user: userDetail.data.verifiedToken.user_id,
      message: data.message,
    });
    // find user ko detail using

    const userData = findUser({ _id: userDetail.data.verifiedToken.user_id });
    console.log(userData, "is here any userData");

    const emittingData = {
      message: data.message,
      //   user: {},
      //   time: new Date(),
    };

    // to emit the message to the client
    // io.to(data.chatroom).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});

// public folder
app.use(express.static("public"));
// fileupload
const fileUpload = require("express-fileupload");
app.use(fileUpload());

// database connection
require("./src/database/dbConnection");
// routing
app.use("/api", require("./src/routing"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});



// to verify the token
// io.use((socket, next) => {});

// server listen on port
server.listen(port, (err) => {
  if (err) console.log("Error in server setup");
  console.log(`Example app listening at http://localhost:${port}`);
});
