const express = require("express");
const { getChat } = require("../controllers/Message");

const router = express.Router();

router.get("/:senderId/:recieverId", getChat);

module.exports = router;
