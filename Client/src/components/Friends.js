import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../store/auth-context";
import FriendList from "./FriendList";
import "./Friends.css";
import io from "socket.io-client";

const ENDPOINT = "https://ssuetchatting.herokuapp.com//api/socket";

const Friends = () => {
  const [users, setUsers] = useState([]);
  const AuthCtx = useContext(AuthContext);

  const socket = io(ENDPOINT);

  const getAllUsers = async () => {
    const res = await fetch(
      "https://ssuetchatting.herokuapp.com/api/v1/users",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": AuthCtx.token,
        },
      }
    );
    const data = await res.json();
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
          <FriendList
            key={user._id}
            currentUserId={AuthCtx.currentUser._id}
            userInfo={user}
          />
        ))}
    </div>
  );
};

export default Friends;
