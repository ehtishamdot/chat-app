import React, { useState, useEffect, useRef, useContext } from "react";
import "./Message.css";

import io from "socket.io-client";
import MessageForm from "./MessageForm";
import { AuthContext } from "../../store/auth-context";
import { useParams } from "react-router-dom";
const ENDPOINT = "localhost:5000/api/socket";

const Message = (props) => {
  const AuthCtx = useContext(AuthContext);
  const { id: userId } = useParams();

  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);

  const socket = io(ENDPOINT);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView();
  };

  useEffect(scrollToBottom, [messages]);
  console.log("runign yo");
  const getMessages = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/v1/messages/${AuthCtx.currentUser._id}/${userId}`
      );
      const data = await res.json();
      console.log(data);
      setMessages(data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getMessages();
  }, [userId]);

  const onSetMessageHandler = async (message) => {
    console.log(AuthCtx.currentUser._id);
    await fetch("http://localhost:5000/api/v1/messages", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        senderId: AuthCtx.currentUser._id,
        recieverId: userId,
        message: {
          body: message,
          from: AuthCtx.currentUser._id,
          to: userId,
        },
      }),
    });

    socket.on("newMessage", (message) => {
      console.log(message);
      setMessages((prevMessage) => [...prevMessage, message]);
    });
  };

  const messageTo = messages
    ?.filter(
      (message, pos, self) =>
        self.findIndex((msg) => msg._id === message._id) === pos
    )
    .map((chat) => {
      console.log(chat.message);

      return (
        <div
          key={chat._id}
          className={`${
            AuthCtx.currentUser._id === chat.message.from
              ? "message__to"
              : "message__from"
          }`}
        >
          <span className="message__content">
            <p>{chat.message.body}</p>
            <span>{chat.message.date}</span>
          </span>
        </div>
      );
    });

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
