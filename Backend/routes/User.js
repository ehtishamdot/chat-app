const express = require("express");
const { userModel } = require("../models/User");
const router = express.Router();
const asyncWrapper = require("../middleware/async");
const Auth = require("../middleware/auth");

router.get('/', Auth ,asyncWrapper(async(req,res) => {
    const users = await userModel.find();
    res.json(users);
}))
module.exports = router;