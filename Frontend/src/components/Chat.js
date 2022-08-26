import React from "react";

import io from "socket.io-client";

const ENDPOINT = "localhost:5000";

const Chat = () => {
  socket.on("pushMessage", async (data, callback) => {
    const message = new messageModel(data);
    socket.emit("getMessage ", chat);
  });
  return (
    <div>
      <MessageEvent />
      <h3>Name</h3>
      <p>message</p>
    </div>
  );
};

export default Chat;
