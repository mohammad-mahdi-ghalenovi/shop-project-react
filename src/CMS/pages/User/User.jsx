import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { getAllUsers, putUser } from "../../../utils";
import { useParams } from "react-router-dom";
import "./User.css";
import Chart from "../../components/Chart/Chart";

export default function User() {
  const [users, setUsers] = useState();
  const [user, setUser] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const getDatas = async () => {
      setUsers(await getAllUsers());
    };

    getDatas();
  }, []);

  useEffect(() => {
    users && setUser(users.find((user) => user[1].id == params.userID));
  }, [users]);

  let params = useParams();

  const editToggler = () => {
    setName(user[1].name);
    setPassword(user[1].password);

    setIsEditing((prev) => !prev);
  };

  const submitEditedUser = async () => {
    let newUser = { ...user[1] };

    newUser.name = name;
    newUser.password = password;

    let isSuccessed = putUser(user[0], newUser);
    
    if (isSuccessed) {
      console.log("edited");
    } else {
      console.log("sth went wrong!");
    }
  };

  return (
    <>
      {user ? (
        <div className="user-container">
          <div className="user-chart">
            {/* <Chart title="User Analytics" /> */}
          </div>
          <div className="user-details">
            <span>
              Name :
              <input
                type="text"
                className={isEditing ? "active" : ""}
                value={isEditing ? name : user[1].name}
                onChange={(e) => setName(e.target.value)}
              />
            </span>
            <span>
              Password :
              <input
                type="text"
                className={isEditing ? "active" : ""}
                value={isEditing ? password : user[1].password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </span>
            <span>Basket Length : {user[1].basket.length - 1} </span>
            <button className="user-details__edit" onClick={editToggler}>
              {isEditing ? "Decline Editing" : "Edit User"}
            </button>
            {isEditing && (
              <button
                className="user-details__submit"
                onClick={submitEditedUser}
              >
                Submit Changes
              </button>
            )}
          </div>
        </div>
      ) : (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
    </>
  );
}
