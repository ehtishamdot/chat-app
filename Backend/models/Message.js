const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  recieverId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  message: {
    type: Array,
    _id: mongoose.Types.ObjectId,
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
  },
});

const Message = mongoose.model("messages", chatSchema);

module.exports = { Message };
