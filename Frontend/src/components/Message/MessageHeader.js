import React from "react";
import Message from "./Message";
import "./MessageHeader.css";

const MessageHeader = (props) => {
  return (
    <div className="chat__header">
      <h3>Name</h3>
      <Message />
    </div>
  );
};

export default MessageHeader;
