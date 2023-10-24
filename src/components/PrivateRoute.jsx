import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { findUser, getUserFromCookie, getAllUsers } from "../utils";

export default function PrivateRoute({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    async function fetchUsers() {
      isUserLogin(await getAllUsers());
      setUser(await findUser(getUserFromCookie().userToken));
    }

    fetchUsers();
  }, []);

  const isUserLogin = (userData) => {
    let updatedData = userData.map((user) => user[0]);

    let isInputLogin = updatedData.some((userID) => {
      return getUserFromCookie().userToken === userID;
    });

    setIsLogin(isInputLogin);

    setIsLoading(false);
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : isLogin ? (
    <>
      <h1>Name : {user && user[1].name}</h1>
      <h1>Password : {user && user[1].password}</h1>
      {children}
    </>
  ) : (
    "login first"
  );
}
