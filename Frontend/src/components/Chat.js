import React, { useState, useEffect } from "react";

import io from "socket.io-client";
import MessageForm from "./MessageForm";

const ENDPOINT = "localhost:5000";

const Chat = () => {
  const [message, SetMessage] = useState("");

  const socket = io(ENDPOINT);

  const onSetMessageHandler = (message) => {
    SetMessage(message);
  };

  useEffect(() => {
    socket.emit("getMessage", { message: message }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, []);

  // socket.on("pushMessage", async (data, callback) => {
  //   const message = new messageModel(data);
  //   socket.emit("getMessage ", chat);
  // });

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
      <p>message</p>
      <MessageForm getMessage={onSetMessageHandler} style={{}} />
    </div>
  );
};

export default Chat;
