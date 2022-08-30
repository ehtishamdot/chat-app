const asyncWrapper = require("../middleware/async");
const { Message } = require("../models/Message");
const jwt = require("jsonwebtoken");

const getMessages = asyncWrapper(async (req, res) => {
  const messages = await Message.find({});
  res.send(messages);
});

const sendMessage = asyncWrapper(async (req, res) => {
  const token = req.body.token;
  const sender = await jwt.decode(token, process.env.JWT_SECRET);
  const message = new Message({
    to: sender._id,
    from: req.body.from,
    body: req.body.body,
  });

  await message.save();

  res.send(message);
});

module.exports = {
  getMessages,
  sendMessage,
};
