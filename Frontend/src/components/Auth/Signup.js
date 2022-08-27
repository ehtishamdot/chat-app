import React from "react";
import "./Login.css";

const Login = (props) => {
  return (
    <div className="Main">
      <div className="title">
        <h1 className=" welcome">Welcome</h1>
        <div className="banner">
          <h1>Login</h1>
        </div>
      </div>
      <div className="form">
        <div>
          <form action="Post">
            <input className="email" type="email" placeholder="Email"></input>
            <input
              className="email"
              id="password"
              type="password"
              placeholder="Password"
            ></input>
          </form>
        </div>
        <div>
          <button className="button">Login</button>
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
