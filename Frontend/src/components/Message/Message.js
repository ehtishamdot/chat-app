import React, { useState, useEffect, useRef, useContext } from "react";
import "./Message.css";

import io from "socket.io-client";
import MessageForm from "./MessageForm";
import { AuthContext } from "../../store/auth-context";
import { useParams } from "react-router-dom";
import MessageHeader from "./MessageHeader";
const ENDPOINT = "localhost:5000/api/socket";

const Message = () => {
  const AuthCtx = useContext(AuthContext);

  const { chatId, userId } = useParams();

  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);

  const socket = io(ENDPOINT);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView();
  };

  useEffect(scrollToBottom, [messages]);
  const getMessages = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/v1/messages/${AuthCtx.currentUser._id}/${userId}`
      );
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getMessages();
  }, [userId, chatId]);

  const onSetMessageHandler = async (message) => {
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
      if (chatId === message.chatId)
        setMessages((prevMessage) => [...prevMessage, message]);
    });
  };

  const messageTo = messages
    ?.filter(
      (message, pos, self) =>
        self.findIndex((msg) => msg._id === message._id) === pos &&
        chatId === message.chatId
    )
    .map((message, i) => {
      return (
        <div
          key={i}
          className={`${
            AuthCtx.currentUser._id === message.from
              ? "message__from"
              : "message__to"
          }`}
        >
          <div className="message__content">
            <p>{message.body}</p>
            <span className="message__time">
              {new Date(message.date).toLocaleString("en-US", {
                hour: "numeric",
                hour12: true,
                minute: "numeric",
              })}
            </span>
          </div>
        </div>
      );
    });

  return (
    <section className="chatbox">
      <MessageHeader currentUserId={userId} />
      <div className="chatbox__messages">
        <div className="chatbox__messages__list">
          {messageTo}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <MessageForm getMessage={onSetMessageHandler} style={{}} />
    </section>
  );
};

export default Message;
