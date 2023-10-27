import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { getAllUsers, putUser } from "../../../utils";
import { useParams } from "react-router-dom";
import "./User.css";
import Chart from "../../components/Chart/Chart";
import Alert from "@mui/material/Alert";

export default function User() {
  const [users, setUsers] = useState();
  const [user, setUser] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [isSuccessed, setIsSuccessed] = useState(false);
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
      setIsSuccessed(true);
      setTimeout(() => {
        setIsSuccessed(false);
      }, 3000);
    }
  };

  return (
    <>
      {user ? (
        <div className="user-container">
          {isSuccessed && (
            <Alert  variant="filled" severity="success">
              User Edited Successfully — check it out!
            </Alert>
          )}
          <div className="user-chart">
            {/* <Chart title="User Analytics" /> */}
          </div>
          <div className="user-details">
            <span>
              <p>Name :</p>
              <input
                type="text"
                className={
                  isEditing
                    ? "active user-details__input"
                    : "user-details__input"
                }
                value={isEditing ? name : user[1].name}
                onChange={(e) => setName(e.target.value)}
              />
            </span>
            <span>
              <p>Password :</p>
              <input
                type="text"
                className={
                  isEditing
                    ? "active user-details__input"
                    : "user-details__input"
                }
                value={isEditing ? password : user[1].password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </span>

            <span>Basket Length : {user[1].basket.length - 1} </span>

            <div className="user-details-controls">
              <button
                className={
                  isEditing
                    ? "user-details__edit--cancel "
                    : "user-details__edit"
                }
                onClick={editToggler}
              >
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
        </div>
      ) : (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
    </>
  );
}
