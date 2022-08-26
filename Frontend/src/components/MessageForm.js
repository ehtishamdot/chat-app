import React, { useState } from "react";

const MessageForm = (props) => {
  const [message, setMessage] = useState();

  const onChangeHandler = (event) => {
    setMessage(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    props.getMessage(message);
  };

  return (
    <form onSubmit={onSubmitHandler} style={props.style}>
      <input onChange={onChangeHandler} />
    </form>
  );
};

export default MessageForm;
