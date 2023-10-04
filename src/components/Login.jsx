import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { findUser, getUserFromCookie, getAllUsers } from "./../utils";

export default function Login() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    async function fetchUsers() {
      setUsers(await getAllUsers());
    }

    fetchUsers();
  }, []);

  useEffect(() => {
    let cookiedUser = getUserFromCookie();
    if (cookiedUser.userToken) {
      // if the cookies wasn`t undefined
      setName(cookiedUser.username);
      setPassword(cookiedUser.password);
    }
  }, []);

  // Login automatically... 🔑

  const loginHandler = () => {
    let userInfo = {
      name,
      password,
    };

    users.forEach((user) => {
      if (
        user[1].name === userInfo.name &&
        user[1].password === userInfo.password
      ) {
        navigate(`/`);
        setCookies(userInfo, user[0]);
      }
    });
  };

  const setCookies = (user, userToken) => {
    document.cookie = `user-name=${user.name};expires=Fri, 31 Dec 9999 23:59:59 GMT;`;
    document.cookie = `user-password=${user.password};expires=Fri, 31 Dec 9999 23:59:59 GMT;`;
    document.cookie = `user-token=${userToken};expires=Fri, 31 Dec 9999 23:59:59 GMT;`;
  };

  return (
    <>
      <h1>LOGIN</h1>
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
      <button onClick={loginHandler}>Submit</button>
    </>
  );
}
