const express = require("express");
const router = express.Router();
const { userModel } = require("../models/User");
const asyncWrapper = require("../middleware/async");
const { Unauthorized } = require("../errors/unauthorized");
const jwt = require("jsonwebtoken");

router.post(
  "/",
  asyncWrapper(async (req, res) => {
    const { token } = req.body;
    const data = await jwt.decode(token, process.env.JWT_SECRET);

    if (!data) throw new Unauthorized("Not logged In");

    res.send(data);
  })
);

module.exports = router;
