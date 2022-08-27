import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../store/auth-context";
import "./Login.css";

const Login = (props) => {
  const AuthCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const getObj = () => {
      return {
        username: email,
        password: password,
      };
    };

    console.log(getObj());

    const getToken = async () => {
      const res = await fetch("http://localhost:5000/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(getObj()),
      });
      return res.json();
    };

    const { token } = await getToken();

    if (token !== undefined && token) {
      AuthCtx.login(token);
      navigate("/chat");
    }
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="Main">
      <div className="title">
        <h1 clas=" welcome">Welcome</h1>
        <div className="banner">
          <h1>Login</h1>
        </div>
      </div>

      <div className="form">
        <div>
          <form action="Post" onSubmit={onSubmitHandler}>
            <input
              className="email"
              type="text"
              placeholder="username"
              onChange={onChangeEmail}
            ></input>
            <input
              className="email"
              id="password"
              type="password"
              placeholder="Password"
              onChange={onChangePassword}
            ></input>

            <button className="button">Login</button>
          </form>
        </div>
      </div>
      <footer className="footer">
        <p>If you don't have id then</p>
        <a href="./signin.html">Sign Up</a>
      </footer>
    </div>
  );
};

export default Login;
