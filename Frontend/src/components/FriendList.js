import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Friends.css";

const FriendList = ({ userInfo, currentUserId }) => {
  const [chatId, setChatId] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/chat/${currentUserId}/${userInfo._id}`)
      .then((res) => res.json())
      .then((data) => setChatId(data._id));
  }, [userInfo]);

  return (
    <Link
      className="friends__list__item"
      key={userInfo._id}
      to={`${chatId}/${userInfo._id}`}
    >
      <div className="friend__img">
        <img src="https://pps.whatsapp.net/v/t61.24694-24/290952396_1010228406344356_1732166173849934192_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_AVxYAme4EYV2GvGAUhb14qLrHLhhkd9sClksBAik8NJTwA&oe=63200D01" />
      </div>
      <div className="friend_info">
        <span>{userInfo.name}</span>
      </div>
    </Link>
  );
};

export default FriendList;
