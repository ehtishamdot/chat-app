import React from "react";

import "./ChatSideBar.css";
import Friends from "./Friends";
import MessageHeader from "./Message/MessageHeader";

const ChatSideBar = () => {
  return (
    <div className="chatSideBar">
      {/* <MessageHeader /> */}
      <Friends />
    </div>
  );
};

export default ChatSideBar;
