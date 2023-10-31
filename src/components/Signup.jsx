import React, { useState, useEffect } from "react";
import { addNewUser, getAllUsers } from "../utils";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isSucceeded, setIsSucceeded] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    isSucceeded &&
      setTimeout(() => {
        setIsSucceeded(false);
        navigate("/login");
      }, 3000);
  }, [isSucceeded]);

  const addUser = async () => {
    if (name.length > 1 && password.length > 1) {
      setIsSucceeded(await addNewUser(name, password));
    }
  };

  return (
    <>
      <h1>SIGN UP</h1>
      {isSucceeded && (
        <Alert variant="filled" severity="success">
          You have registered Successfully — check it out!
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
