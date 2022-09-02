import React, { useContext, useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../store/auth-context";
import "./Signup.css";

const Signup = () => {
  const [error, setError] = useState("");

  const AuthCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const signupReducer = (state, action) => {
    return {
      ...state,
      [action.name]: action.value,
    };
  };

  const [inputState, dispatch] = useReducer(signupReducer, {
    name: "",
    username: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    dispatch({
      type: "input",
      name: event.target.name,
      value: event.target.value,
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    console.log(inputState);

    const postUser = async () => {
      const rawResponse = await fetch("http://localhost:5000/api/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...inputState }),
      });
      const data = await rawResponse.json();
      console.log(data);
      if (data.msg) {
        setError(data.msg);
      }

      if (data.token) {
        AuthCtx.login(data.token);
        navigate("/chat");
      }
    };
    postUser();
  };

  setTimeout(() => setError(null), [7000]);

  return (
    <React.Fragment>
      <div className="Main">
        <div className="title">
          <h1 className={error ? "error" : "welcome"}>
            {error ? error : "Welcome"}
          </h1>
          <div className="banner">
            <h1>Signup</h1>
          </div>
        </div>

        <div className="form">
          <div>
            <form action="Post" onSubmit={onSubmitHandler}>
              <input
                type="text"
                onChange={onChangeHandler}
                name="username"
                required
                className="email"
                placeholder="username.."
              ></input>
              <input
                type="text"
                onChange={onChangeHandler}
                name="name"
                required
                className="email"
                placeholder="name.."
              ></input>
              <input
                onChange={onChangeHandler}
                name="password"
                className="email"
                id="password"
                required
                type="password"
                placeholder="Password.."
              ></input>

              <button className="button">Signup</button>
              <Link to={`/login`}>
                <footer className="footer">
                  <p>Already have account?</p>
                </footer>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Signup;
