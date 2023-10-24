import React, { useState, useEffect } from "react";
import { users } from "../../../data";
import { useParams } from "react-router-dom";
import "./User.css";

export default function User() {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(users.find((user) => user.id == params.userID));
  }, []);

  let params = useParams();

  return <div className="userPage-container">{user && user.name}</div>;
}
