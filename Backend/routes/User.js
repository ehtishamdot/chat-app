const express = require("express");
const { userModel } = require("../models/User");
const router = express.Router();
const asyncWrapper = require("../middleware/async");
const Auth = require("../middleware/auth");

router.get(
  "/",
  Auth,
  asyncWrapper(async (req, res) => {
    const users = await userModel.find();
    res.json(users);
  })
);

router.get(
  "/:id",
  asyncWrapper(async (req, res) => {
    console.log(req.params.id);
    const user = await userModel.find({ _id: req.params.id });
    console.log(user);
    res.json(...user);
  })
);

module.exports = router;
