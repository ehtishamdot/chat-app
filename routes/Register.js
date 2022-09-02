const express = require("express");
const router = express.Router();
const { userModel } = require("../models/User");
const asyncWrapper = require("../middleware/async");
const { Unauthorized } = require("../errors/unauthorized");

router.post(
  "/",
  asyncWrapper(async (req, res) => {
    const { username } = req.body;
    let user = await userModel.findOne({ username: username });

    console.log(user);
    if (user) throw new Unauthorized("User already exist");

    user = new userModel(req.body);
    const token = await user.genrateToken();

    await user.save();

    res.send({ user, token });
  })
);

module.exports = router;
