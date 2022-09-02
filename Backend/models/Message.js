const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new mongoose.Schema({
  to: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  from: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  body: {
    type: String,
    required: true,
  },
  chatId: {
    type: String,
    required: true,
  },
});

const Message = mongoose.model("messages", messageSchema);

const chatSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  recieverId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = { Message, Chat };
