import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../store/auth-context";
import jwtDecode from "jwt-decode";
import "./Login.css";

const Login = () => {
  const AuthCtx = useContext(AuthContext);

  const navigate = useNavigate();

  const [error, setError] = useState("");
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
      const res = await fetch(
        "https://ssuetchatting.herokuapp.com/api/v1/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(getObj()),
        }
      );
      return res.json();
    };

    const { token, msg } = await getToken();

    if (msg) {
      setError(msg);
    }

    if (token !== undefined && token) {
      AuthCtx.login(token);
      const user = await jwtDecode(token);
      console.log(user);
      AuthCtx.getUser(user);

      navigate("#/chat");
    }
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  setTimeout(() => setError(null), [7000]);

  return (
    <div className="Main">
      <div className="title">
        <h1 className={error ? "error" : "welcome"}>
          {error ? error : "Welcome"}
        </h1>
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

            <button className="button__login">Login</button>
          </form>
        </div>
      </div>
      <Link to={`/signup`}>
        <footer className="footer">
          <p>Don't have account? </p>
        </footer>
      </Link>
    </div>
  );
};

export default Login;
