const asyncWrapper = require("../middleware/async");
const { Message } = require("../models/Message");

const getMessages = asyncWrapper(async (req, res) => {
  const { senderId, recieverId } = req.params;
  console.log(senderId, recieverId);
  const messages = await Message.find({
    $or: [
      {
        recieverId: recieverId,
        senderId: senderId,
      },
      {
        recieverId: senderId,
        senderId: recieverId,
      },
    ],
  });
  res.send(messages);

  // const messages = await Message.find({
  //   recieverId: recieverId,
  //   senderId: senderId,
  // }).or([{ recieverId: senderId, senderID: recieverId }]);
});

const sendMessage = asyncWrapper(async (req, res) => {
  const message = new Message(req.body);
  await message.save();
  res.send(message);
});

module.exports = {
  getMessages,
  sendMessage,
};
