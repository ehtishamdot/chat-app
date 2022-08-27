import React, { useContext } from "react";
import Chat from "./components/Chat";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Auth/Login";
import { AuthContext } from "./store/auth-context";

const App = () => {
  const AuthCtx = useContext(AuthContext);
  console.log(AuthCtx.isLoggedIn);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={`${AuthCtx.isLoggedIn ? "chat" : "login"}`} />}
        />
        <Route path="chat" element={AuthCtx.isLoggedIn && <Chat />} />
        <Route path="login" element={!AuthCtx.isLoggedIn && <Login />} />
      </Routes>
    </Router>
  );
};

export default App;
