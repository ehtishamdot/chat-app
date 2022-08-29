import React, { useState, useEffect, useRef, useContext } from "react";
import "./Message.css";

import io from "socket.io-client";
import MessageForm from "./MessageForm";
import { AuthContext } from "../../store/auth-context";

const ENDPOINT = "localhost:5000";

const Message = (props) => {
  const AuthCtx = useContext(AuthContext);

  // AuthCtx.token
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);

  const socket = io(ENDPOINT);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    socket.on("getAllMessages", (messages) => {
      setMessages(messages);
    });
  }, []);

  const onSetMessageHandler = (message) => {
    socket.emit(
      "pushMessage",
      { body: message, from: "630995e7928bf4921a8f0e8e", to: AuthCtx.token },
      (error) => {
        if (error) {
          alert(error);
        }
      }
    );

    socket.on("getMessage", (message) => {
      setMessages((prevMessage) => [...prevMessage, message]);
    });
  };

  const messageTo = messages.map((message) => (
    <div key={message._id} className="message__to">
      <span className="message__content">
        <p>{message.body}</p>
        <span>9:50pm seen</span>
      </span>
    </div>
  ));
  console.log(messages);

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
