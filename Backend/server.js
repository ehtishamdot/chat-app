const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const { Message } = require("./models/Message");

require("dotenv").config();
require("./startup/routes")(app);

const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

// socket.on --> get the data
// socket.emit --> post the data

io.on("connection", async (socket) => {
  const allMessages = await Message.find();
  socket.emit("getAllMessages", allMessages);

  socket.on("pushMessage", async (data, callback) => {
    const message = new Message(data);
    await message.save();

    socket.emit("getMessage", message);
    callback();
  });
});

app.use(function (req, res, next) {
  req.io = io;
  next();
});

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    server.listen(port, () => {
      console.log(`Server running at port: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
