const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new mongoose.Schema({
  to: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  from: {
    type: Schema.Types.ObjectId,
    ref: "user",
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

const Message = mongoose.model("messages", messageSchema);

module.exports = { Message };
