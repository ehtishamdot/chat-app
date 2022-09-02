const express = require("express");
const errorHandlerMiddleware = require("../middleware/error-handler");
var cors = require("cors");
const message = require("../routes/Message");
const chat = require("../routes/Chat");
const login = require("../routes/Login");
const register = require("../routes/Register");
const addFriend = require("../routes/addFriend");
const getUser = require("../routes/getUser");
const getAllUsers = require("../routes/User");

module.exports = (app) => {
  app.use(cors());
  app.use(express.json());

  //end points will be here
  app.use("/api/v1/getUser", getUser);
  app.use("/api/v1/addfriend", addFriend);
  app.use("/api/v1/messages", message);
  app.use("/api/v1/chat", chat);
  app.use("/api/v1/login", login);
  app.use("/api/v1/register", register);
  app.use("/api/v1/users", getAllUsers);

  app.use(express.static("Client/build"));

  app.use(errorHandlerMiddleware);
};
