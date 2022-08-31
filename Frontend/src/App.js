import React, { useContext, useEffect } from "react";
import Chat from "./components/Chat";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Auth/Login";
import { AuthContext } from "./store/auth-context";
import Message from "./components/Message/Message";

const App = () => {
  const AuthCtx = useContext(AuthContext);

  const getUser = async () => {
    const res = await fetch("http://localhost:5000/api/v1/getUser", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: AuthCtx.token,
      }),
    });

    const user = await res.json();
    AuthCtx.getUser(user);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="chat" element={AuthCtx.isLoggedIn && <Chat />}>
          <Route path=":id" element={<Message />} />
        </Route>
        <Route path="login" element={!AuthCtx.isLoggedIn && <Login />} />
      </Routes>
    </Router>
  );
};

export default App;
