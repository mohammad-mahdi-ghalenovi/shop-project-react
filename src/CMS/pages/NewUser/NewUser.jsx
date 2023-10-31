import React, { useEffect, useState } from "react";
import { addNewUser } from "../../../utils";
import Alert from "@mui/material/Alert";

export default function NewUser() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isSucceeded, setIsSucceeded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsSucceeded(false);
    }, 3000);
  }, [isSucceeded]);

  const addUser = async () => {
    if (name.length > 1 && password.length > 1) {
      setIsSucceeded(await addNewUser(name, password));
    }
  };

  return (
    <div className="newUser-container">
      {isSucceeded && (
        <Alert variant="filled" severity="success">
          User Added Successfully — check it out!
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
