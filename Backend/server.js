const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const mongoose = require("mongoose");

const connection = mongoose.connection;

require("dotenv").config();
require("./startup/routes")(app);

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.of("/api/socket").on("connection", (socket) => {});

// socket.on --> get the data
// socket.emit --> post the data

connection.once("open", async () => {
  console.log("Connected to Stream");
  // const allMessages = await Message.find();
  // socket.emit("getAllMessages", allMessages);

  const messagesChangeStream = connection.collection("messages").watch();
  messagesChangeStream.on("change", async (change) => {
    console.log("running oh");
    switch (change.operationType) {
      case "insert":
        io.of("/api/socket").volatile.emit("newMessage", change.fullDocument);
        break;
    }
  });
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
