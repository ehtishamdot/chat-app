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
    if (!user) throw new BadRequest("Invalid Username or Password");

    const validPassword = await user.comparePassword(password);
    console.log(validPassword);
    if (!validPassword) throw new BadRequest("Invalid Username or Password");

    const token = await user.genrateToken();
    res.header("x-auth-token", token).send({ token });
  })
);
module.exports = router;
