import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MessageHeader.css";

const MessageHeader = (props) => {
  const [userInfo, setUserInfo] = useState();

  const { id: userId } = useParams();
  console.log(userId);

  const getCurrentUser = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/v1/users/${userId}`);
      const data = await res.json();
      console.log(data);
      setUserInfo(data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, [userId]);

  return (
    <div className="chat__header">
      <span>{userInfo?.name}</span>
    </div>
  );
};

export default MessageHeader;
