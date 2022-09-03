import React, { useContext, useEffect } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Chat from "./components/Chat";
import Login from "./components/Auth/Login";
import { AuthContext } from "./store/auth-context";
import Message from "./components/Message/Message";
import Signup from "./components/Auth/Signup";

const App = () => {
  const AuthCtx = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate replace to={AuthCtx.isLoggedIn ? "#/chat" : "#/login"} />
          }
        />

        <Route
          path="*"
          element={
            <Navigate replace to={AuthCtx.isLoggedIn ? "#/chat" : "#/login"} />
          }
        />

        <Route path="#/chat" element={AuthCtx.isLoggedIn && <Chat />}>
          <Route path="#/:chatId/:userId" element={<Message />} />
        </Route>
        <Route path="#/login" element={!AuthCtx.isLoggedIn && <Login />} />
        <Route path="#/Signup" element={!AuthCtx.isLoggedIn && <Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
