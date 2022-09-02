import React, { useState } from "react";
import "./MessageForm.css";

const MessageForm = (props) => {
  const [message, setMessage] = useState("");

  const onChangeHandler = (event) => {
    setMessage(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    props.getMessage(message);
    setMessage("");
  };

  return (
    <form onSubmit={onSubmitHandler} style={props.style}>
      <input type="text" value={message} onChange={onChangeHandler} />
    </form>
  );
};

export default MessageForm;
