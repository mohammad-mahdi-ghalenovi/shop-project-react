import React, { useState, useEffect } from "react";
import { findUser, getUserFromCookie, getAllUsers } from "../utils";

export default function Login() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("mmd");
  const [password, setPassword] = useState("321");
  const [getUsers, setGetUsers] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      setUsers(await getAllUsers());
    }

    fetchUsers();
  }, [getUsers]);

  const isUserDuplicated = () => {
    let userInfo = {
      name,
      password,
    };

    users.forEach((user) => {
      if (user[1].name === userInfo.name) {
        console.log("this username alreadySignedUp");
      } else {
        addUser();
      }
    });
  };

  const addUser = async () => {
    let newUser = {
      id: users.length + 1,
      name,
      password,
      basket: [{ name: "", price: 0, count: 1 }],
    };

    await fetch(
      "https://sabzlearn-dashboard-default-rtdb.firebaseio.com/users.json",
      {
        method: "POST",
        body: JSON.stringify(newUser),
      }
    )
      .then((res) => res.json())
      .then((data) => console.log(data));

    setGetUsers((prev) => !prev);
    setName("");
    setPassword("");
  };

  return (
    <>
      <h1>SIGN UP</h1>
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
      <button onClick={isUserDuplicated}>Submit</button>
    </>
  );
}