import React, { useState, useEffect } from "react";
import { addNewUser, getAllUsers } from "../utils";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isSucceeded, setIsSucceeded] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    isSucceeded == "succeeded" &&
      setTimeout(() => {
        setIsSucceeded("");
        navigate("/login");
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
    <>
      <h1>SIGN UP</h1>
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

      <input
        type="text"
        placeholder="Name:"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        type="password"
        placeholder="Password: "
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button onClick={addUser}>Submit</button>
    </>
  );
}
