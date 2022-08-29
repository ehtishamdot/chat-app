const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const { Message } = require("./models/Message");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const connection = mongoose.connection;

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
    const token = data.to;
    const sender = await jwt.decode(token, process.env.JWT_SECRET);
    console.log(sender);
    const message = new Message({
      to: sender._id,
      from: data.from,
      body: data.body,
    });
    console.log(message);
    await message.save();

    socket.emit("getMessage", message);
    callback();
  });
});

connection.once("open", () => {
  console.log("connected to server");

  const messagesChangeStream = connection.collection("messages").watch();

  messagesChangeStream.on("change", async (change) => {
    switch (change.operationType) {
      case "insert":
        const message = {
          _id: change.fullDocument._id,
          from: change.fullDocument.from,
          to: change.fullDocument.to,
          body: change.fullDocument.body,
        };

        io.emit("pushMessage", message);
        break;
    }
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
