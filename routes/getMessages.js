const express = require("express");
const { messageModel } = require("../models/Message");
const router = express.Router();
const asyncWrapper = require("../middleware/async");
const Auth = require("../middleware/auth");

router.get('message/:id/:token', auth , asyncWrapper(async (req, res) => {
    const messages = await messageModel.find({})
}))