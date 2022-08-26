import React from "react";

const MessageForm = () => {
  const onChangeHandler = (event) => {
    console.log(event.target.value);
  };

  return (
    <form>
      <input onChange={onChangeHandler} />
    </form>
  );
};

export default MessageForm;
