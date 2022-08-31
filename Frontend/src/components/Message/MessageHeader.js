import React, { useContext } from "react";
import { AuthContext } from "../../store/auth-context";
import "./MessageHeader.css";

const MessageHeader = (props) => {
  const AuthCtx = useContext(AuthContext);
  console.log(AuthCtx.currentUser);
  return (
    <div className="chat__header">
      <h3>{AuthCtx.currentUser?.name}</h3>
    </div>
  );
};

export default MessageHeader;
