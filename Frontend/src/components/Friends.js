import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../store/auth-context";
import "./Friends.css";

const Friends = () => {
  const [users, setUsers] = useState([]);
  const AuthCtx = useContext(AuthContext);

  const getAllUsers = async () => {
    const res = await fetch("http://localhost:5000/api/v1/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": AuthCtx.token,
      },
    });
    const data = await res.json();
    console.log(data);
    setUsers(data);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="friends__list">
      {users
        .filter((user) => user._id !== AuthCtx.currentUser._id)
        .map((user) => (
          <Link
            className="friends__list__item"
            key={user._id}
            to={`${user._id}`}
          >
            <div className="friend__img">
              <img src="https://pps.whatsapp.net/v/t61.24694-24/290952396_1010228406344356_1732166173849934192_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_AVxYAme4EYV2GvGAUhb14qLrHLhhkd9sClksBAik8NJTwA&oe=63200D01" />
            </div>
            <div className="friend_info">
              <span>{user.name}</span>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default Friends;
