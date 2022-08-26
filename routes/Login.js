const express = require("express");
const router = express.Router();
const { userModel } = require("../models/User");
const { BadRequest } = require("../errors/bad-request");
const asyncWrapper = require("../middleware/async");

router.post(
  "/",
  asyncWrapper(async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    const user = await userModel.findOne({ username: username });
    console.log(user);

    if (!user) throw new BadRequest("Invalid Username or Password");

    const validPassword = await user.comparePassword(password);
    if (!validPassword) throw new BadRequest("Invalid Username or Password");

    const token = await user.genrateToken();
    res.send({ token });
  })
);
module.exports = router;
