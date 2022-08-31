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
});

const chatSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  recieverId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  message: messageSchema,
});

const Message = mongoose.model("messages", chatSchema);

module.exports = { Message };
