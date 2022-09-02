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

const retrieveStoredUserInfo = () => {
  const storedUserInfo = JSON.parse(localStorage.getItem("user-info"));

  console.log(storedUserInfo);

  // if (!storedUserInfo) {
  //   return null;
  // }

  return {
    userInfo: storedUserInfo,
  };
};

const AuthContextProvider = (props) => {
  const tokenDate = retrieveStoredToken();
  const storedUserInfo = retrieveStoredUserInfo();

  let initialUserInfo;
  if (storedUserInfo) {
    initialUserInfo = storedUserInfo.userInfo;
  }

  let initialToken;
  if (tokenDate) {
    initialToken = tokenDate.token;
  }

  const [token, setToken] = useState(initialToken);
  const [user, setUser] = useState(initialUserInfo);

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
    if (user) {
      setUser(user);
      localStorage.setItem("user-info", JSON.stringify(user));
    }
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
