const { Message } = require("../models/Message");
const express = require("express");
const { getMessages, sendMessage } = require("../controllers/Message");

const router = express.Router();

router.get("/:senderId/:recieverId", getMessages);
router.post("/", sendMessage);

module.exports = router;
