import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../store/auth-context";
import "./Friends.css";

const Friends = () => {
  const [users, setUsers] = useState([]);
  const AuthCtx = useContext(AuthContext);

  const getAllUsers = async () => {
    const res = await fetch("http://localhost:5000/api/v1/getAllUsers", {
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
      {users.map((user) => (
        <div className="friends__list__item">
          <div className="friend__img">
            <img src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
          </div>
          <div className="friend_info">
            <span>{user.name}</span>
            <button>Add Friend</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Friends;
