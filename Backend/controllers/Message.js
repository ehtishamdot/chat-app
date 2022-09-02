const asyncWrapper = require("../middleware/async");
const { Message } = require("../models/Message");

const getMessages = asyncWrapper(async (req, res) => {
  const { senderId, recieverId } = req.params;
  console.log(senderId, recieverId);
  const chat = await Message.findOne({
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

  if (!chat) res.send([]);

  res.send(chat);

  // .sort({ date: -1 })
  // .limit(20);

  // const messages = await Message.find({
  //   recieverId: recieverId,
  //   senderId: senderId,
  // }).or([{ recieverId: senderId, senderID: recieverId }]);
});

const sendMessage = asyncWrapper(async (req, res) => {
  console.log(req.body);
  const { senderId, recieverId } = req.body;
  console.log(senderId, recieverId);
  let chat = await Message.findOne({
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

  if (!chat) chat = new Message(req.body);

  chat.message.push(req.body.message);

  await chat.save();

  console.log(chat);
  res.send(chat);
});

// const pushMessage = asyncWrapper(async (req, res) => {
//   const message = await Message.findById(req.body.chatId);
//   if (!message) throw new BadRequest("Chat does not exist");
// });

module.exports = {
  getMessages,
  sendMessage,
};
