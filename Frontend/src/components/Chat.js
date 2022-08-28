import React, { useState, useEffect, useContext } from "react";

import "./Chat.css";

import io from "socket.io-client";
import Friends from "./Friends";
import { MessageContext } from "../store/message-context";
import MessageHeader from "./Message/MessageHeader";
import Message from "./Message/Message";

const ENDPOINT = "localhost:5000";

const Chat = () => {
  const socket = io(ENDPOINT);

  const messageCtx = useContext(MessageContext);

  return (
    <div className="chatapp">
      <MessageHeader />
      <section className="chatapp__body">
        <Friends />
        <Message />
      </section>
      <header />
    </div>
  );
};

export default Chat;
