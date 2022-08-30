import React, { useState, useEffect, useRef, useContext } from "react";
import "./Message.css";

import io from "socket.io-client";
import MessageForm from "./MessageForm";
import { AuthContext } from "../../store/auth-context";

const ENDPOINT = "localhost:5000/api/socket";

const Message = (props) => {
  const AuthCtx = useContext(AuthContext);

  // AuthCtx.token
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);

  const socket = io(ENDPOINT);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView();
  };

  useEffect(scrollToBottom, [messages]);

  const getMessages = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/messages");
      const data = await res.json();
      console.log(data);
      setMessages(data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  const onSetMessageHandler = async (message) => {
    await fetch("http://localhost:5000/api/v1/messages", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: message,
        from: "630995e7928bf4921a8f0e8e",
        token: AuthCtx.token,
      }),
    });

    socket.on("getMessage", (message) => {
      console.log(message);
      setMessages((prevMessage) => [...prevMessage, message]);
    });
  };

  const messageTo = messages
    .filter(
      (message, pos, self) =>
        self.findIndex((msg) => msg._id === message._id) === pos
    )
    .map((message) => (
      <div key={message._id} className="message__to">
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
