import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  currentUser: "",
  isLoggedIn: Boolean,
  login: (token) => {},
  logout: () => {},
  getUser: () => {},
});

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");

  if (!storedToken) {
    return null;
  }

  return {
    token: storedToken,
  };
};

const AuthContextProvider = (props) => {
  const tokenDate = retrieveStoredToken();

  let initialToken;
  if (tokenDate) {
    initialToken = tokenDate.token;
  }

  const [token, setToken] = useState(initialToken);
  const [user, setUser] = useState();

  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    console.log(token);
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    console.log("logout handler");
  };

  const currentUserHandler = (user) => {
    if (user) setUser(user);
  };

  const contextValue = {
    token: token,
    currentUser: user,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    getUser: currentUserHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, AuthContext };
