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
    origin: "*",
  },
});

io.of("/api/socket").on("connection", (socket) => {});

// socket.on --> get the data
// socket.emit --> post the data

connection.on("open", async () => {
  console.log("Connected to Stream");
  // const allMessages = await Message.find();
  // socket.emit("getAllMessages", allMessages);

  const messagesChangeStream = connection.collection("messages").watch();
  messagesChangeStream.on("change", async (change) => {
    switch (change.operationType) {
      case "insert":
        io.of("/api/socket").volatile.emit("newMessage", change.fullDocument);
        break;
    }
  });
});

const port = process.env.PORT;

const start = async () => {
  try {
    await connectDB(
      process.env.MONGO_URI ||
        "mongodb+srv://ehti:1234@nodejsproject.jkebvhi.mongodb.net/Chat-App?retryWrites=true&w=majority"
    );
    server.listen(port, () => {
      console.log(`Server running at port: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
