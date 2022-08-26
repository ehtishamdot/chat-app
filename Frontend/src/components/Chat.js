import React, { useState, useEffect, useLayoutEffect } from "react";

import io from "socket.io-client";
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

  const data = messages.map((message) => <p>{message.body}</p>);

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        border: "2px solid red",
        padding: "1rem 2rem",
        fontSize: "2rem",
      }}
    >
      <h3>Name</h3>
      <div
        style={{
          overflow: "scroll",
          height: "80vh",
        }}
      >
        {data}
      </div>
      <MessageForm getMessage={onSetMessageHandler} style={{}} />
    </div>
  );
};

export default Chat;
