const express = require("express");
const { userModel } = require("../models/User");
const router = express.Router();
const asyncWrapper = require("../middleware/async");
const Auth = require("../middleware/auth");

router.get(
  "/getfriends",
  Auth,
  asyncWrapper(async (req, res) => {
    const friends = await userModel.find(req.user).select({ friends: 1 });
    res.send(friends);
  })
);
router.post(
  "/addfriend",
  Auth,
  asyncWrapper(async (req, res) => {
    const user = await userModel.findOne({ username: req.user.username });
    console.log(user);
    const valid = user.friends.find(function (a) {
      if (a === req.body.username) return true;
    });
    if (!valid) return res.send("user already in friendList");
    user.friends.push(req.body.FriendId);
    await user.save();
    res.send(user);
  })
);

module.exports = router;
