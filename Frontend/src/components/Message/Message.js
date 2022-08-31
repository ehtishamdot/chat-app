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

  const getUser = async () => {
    const res = await fetch("http://localhost:5000/api/v1/getUser", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: AuthCtx.token,
      }),
    });

    const user = await res.json();
    console.log(user);
    AuthCtx.getUser(user);
  };

  useEffect(() => {
    getMessages();
    getUser();
  }, []);

  const onSetMessageHandler = async (message) => {
    console.log(AuthCtx.currentUser._id);
    await fetch("http://localhost:5000/api/v1/messages", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: message,
        from: AuthCtx.currentUser._id,
        to: "630dad7ae0c31e2f1c25be7c",
        token: AuthCtx.token,
      }),
    });

    socket.on("newMessage", (message) => {
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
      <div
        key={message._id}
        className={`${
          AuthCtx.currentUser._id === message.from
            ? "message__to"
            : "message__from"
        }`}
      >
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
        <div ref={messagesEndRef} />
      </div>
      <MessageForm getMessage={onSetMessageHandler} style={{}} />
    </section>
  );
};

export default Message;
