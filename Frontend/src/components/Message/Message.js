import React, { useState, useEffect, useRef } from "react";
import "./Message.css";

import io from "socket.io-client";
import MessageForm from "./MessageForm";

const ENDPOINT = "localhost:5000";

const Message = (props) => {
  const messagesEndRef = useRef(null);
  const [messages, SetMessages] = useState([]);

  const socket = io(ENDPOINT);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

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

  const messageTo = messages.map((message) => (
    <div className="message__to">
      <span className="message__content">
        <p>{message.body}</p>
        <span>9:50pm seen</span>
      </span>
    </div>
  ));

  return (
    <section className="chatbox">
      <div className="chatbox__messages">
        {messageTo}
        <div className="message__from">
          <span className="message__content">
            <p>Hello how are you</p>
            <span>9:50pm seen</span>
          </span>
        </div>
        <div ref={messagesEndRef} />
      </div>
      <MessageForm getMessage={onSetMessageHandler} style={{}} />
    </section>
  );
};

export default Message;
