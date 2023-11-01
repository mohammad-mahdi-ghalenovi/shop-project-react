import React, { useEffect, useState } from "react";
import { addNewUser } from "../../../utils";
import Alert from "@mui/material/Alert";
import "./NewUser.css";

export default function NewUser() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isSucceeded, setIsSucceeded] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setIsSucceeded("");
    }, 3000);
  }, [isSucceeded]);

  const addUser = async () => {
    if (name.length > 1 && password.length > 1) {
      if (await addNewUser(name, password)) {
        setIsSucceeded("succeeded");
      } else {
        setIsSucceeded("failed");
      }
    }
  };

  return (
    <div className="newUser-container">
      {isSucceeded == "succeeded" && (
        <Alert variant="filled" severity="success">
          User Added Successfully — check it out!
        </Alert>
      )}
      {isSucceeded == "failed" && (
        <Alert variant="filled" severity="error">
          Username already exist — try sth else!
        </Alert>
      )}

      <div className="newUser-item">
        <span className="newUser-item__lable">Your Name : </span>
        <input
          type="text"
          placeholder="Name:"
          className="newUser-item__input"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="newUser-item">
        <span className="newUser-item__lable">Your Password : </span>
        <input
          type="text"
          placeholder="Password:"
          className="newUser-item__input"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className="newUser-submit" onClick={addUser}>
        Submit
      </button>
    </div>
  );
}
