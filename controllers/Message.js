const asyncWrapper = require("../middleware/async");
const { Message, Chat } = require("../models/Message");

const getMessages = asyncWrapper(async (req, res) => {
  const { senderId, recieverId } = req.params;
  console.log(senderId, recieverId);
  const chat = await Chat.findOne({
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

  const messages = await Message.find({
    chatId: chat._id,
  });

  console.log();

  res.send(messages);

  // .sort({ date: -1 })
  // .limit(20);

  // const messages = await Message.find({
  //   recieverId: recieverId,
  //   senderId: senderId,
  // }).or([{ recieverId: senderId, senderID: recieverId }]);
});

const getChat = asyncWrapper(async (req, res) => {
  const { senderId, recieverId } = req.params;
  console.log(senderId, recieverId);
  let chat = await Chat.findOne({
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

  console.log(chat);

  if (!chat) {
    chat = new Chat({ senderId, recieverId });
    await chat.save();
  }

  res.send(chat);

  // .sort({ date: -1 })
  // .limit(20);

  // const messages = await Message.find({
  //   recieverId: recieverId,
  //   senderId: senderId,
  // }).or([{ recieverId: senderId, senderID: recieverId }]);
});

const sendMessage = asyncWrapper(async (req, res) => {
  const { senderId, recieverId } = req.body;
  console.log(senderId, recieverId);
  let chat = await Chat.findOne({
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

  if (!chat) {
    chat = new Chat({ senderId, recieverId });
    await chat.save();
  }

  const message = new Message({ ...req.body.message, chatId: chat._id });

  await message.save();

  res.send(message);
});

module.exports = {
  getMessages,
  sendMessage,
  getChat,
};
