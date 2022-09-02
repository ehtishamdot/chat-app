import React from "react";

import "./ChatSideBar.css";
import Friends from "./Friends";
import SideBarHeader from "./SideBarHeader";

const ChatSideBar = () => {
  return (
    <div className="chatSideBar">
      <SideBarHeader />
      <Friends />
    </div>
  );
};

export default ChatSideBar;
