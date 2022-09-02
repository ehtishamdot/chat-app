import React from "react";

import "./Chat.css";
import Friends from "./Friends";
import { Outlet } from "react-router-dom";
import ChatSideBar from "./ChatSideBar";

const Chat = () => {
  return (
    <div className="chatapp">
      <section className="chatapp__body">
        <ChatSideBar />
        <Outlet />
      </section>
    </div>
  );
};

export default Chat;
