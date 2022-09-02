import React, { useReducer, useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [error, setError] = useState("");

  const signupReducer = (state, action) => {
    return {
      ...state,
      [action.name]: action.value,
    };
  };

  const [inputState, dispatch] = useReducer(signupReducer, {
    email: "",
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
    };
    postUser();
  };

  return (
    <React.Fragment>
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
            Sign in
          </h1>
          <form onSubmit={onSubmitHandler} className="mt-6">
            <div className="mb-2">
              <label
                for="username"
                className="block text-sm font-semibold text-gray-800"
              >
                Username
              </label>
              <input
                onChange={onChangeHandler}
                type={"text"}
                name="username"
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
              <label
                for="email"
                className="block text-sm font-semibold text-gray-800"
              >
                Email
              </label>
              <input
                onChange={onChangeHandler}
                type="email"
                name="email"
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                for="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Password
              </label>
              <input
                onChange={onChangeHandler}
                type="password"
                name="password"
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <a href="#" className="text-xs text-purple-600 hover:underline">
              Forget Password?
            </a>
            <div className="mt-6">
              <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                {!error ? "Signup" : error}
              </button>
            </div>
          </form>

          <p className="mt-8 text-xs font-light text-center text-gray-700">
            <Link to={`/login`}> Already have a account? </Link>

            <a href="#" className="font-medium text-purple-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Signup;
