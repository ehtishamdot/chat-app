import React, { useState, useEffect, useLayoutEffect } from "react";

import "./Chat.css";

import io from "socket.io-client";
import Friends from "./Friends";
import MessageForm from "./MessageForm";

const ENDPOINT = "localhost:5000";

const Chat = () => {
  const [messages, SetMessages] = useState([]);

  const socket = io(ENDPOINT);

  useEffect(() => {
    socket.on("getAllMessages", (messages) => {
      SetMessages(messages);
    });
  }, []);

  const onSetMessageHandler = (message) => {
    socket.emit("pushMessage", { body: message }, (error) => {
      if (error) {
        alert(error);
      }
    });

    socket.on("getMessage", (message) => {
      SetMessages((prevMessage) => [...prevMessage, message]);
    });
  };

  const messageTO = messages.map((message) => (
    <div className="message__to">
      <span className="message__content">
        <p>{message.body}</p>
        <span>9:50pm seen</span>
      </span>
    </div>
  ));

  return (
    <div className="chat">
      <Friends />
      <div className="chatbox">
        <h3>Name</h3>
        <div className="chatbox__messages">
          {messageTO}
          <div className="message__from">
            <span className="message__content">
              <p>Hello how are you</p>
              <span>9:50pm seen</span>
            </span>
          </div>
        </div>
        <MessageForm getMessage={onSetMessageHandler} style={{}} />
      </div>
    </div>
  );
};

export default Chat;
