import React, { useState } from "react";

const MessageContext = React.createContext({
  messagesTo: [],
  messagesFrom: [],
  setMessagesTo: () => {},
  setMessagesFrom: () => {},
});

const MessageContextProvider = (props) => {
  const [messagesTo, setMessagesTo] = useState([]);
  const [messagesFrom, setMessagesFrom] = useState([]);

  const onSetMessageToHandler = (messages) => {
    setMessagesTo(messages);
  };
  const onSetMessageFromHandler = (messages) => {
    setMessagesFrom(messages);
  };

  const contextValue = {
    messagesTo: messagesTo,
    messagesFrom: messagesFrom,
    setMessagesTo: onSetMessageToHandler,
    setMessagesFrom: onSetMessageFromHandler,
  };

  return (
    <MessageContext.Provider value={contextValue}>
      {props.children}
    </MessageContext.Provider>
  );
};

export { MessageContextProvider, MessageContext };
