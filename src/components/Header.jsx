import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { findUser, getUserFromCookie, getAllUsers } from "../utils";

export default function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    async function getUsers() {
      isUserLogin(await getAllUsers());
      setUser(await findUser(getUserFromCookie().userToken));
    }

    getUsers();
  }, []);

  const isUserLogin = (userData) => {
    if (userData.some((userID) => getUserFromCookie().userToken === userID)) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };

  const logOutUser = (event) => {
    event.preventDefault();
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie; // if cookie have an equal sign
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }

    setIsLogin(false);
  };

  return (
    <div className="header">
      {isLogin ? (
        user && "Welcome " + user[1].name
      ) : (
        <div className="header__actions">
          <Link to="/login"> Login </Link>
          <Link to="/signup"> SignUp </Link>
        </div>
      )}

      {isLogin && (
        <a href="" onClick={(e) => logOutUser(e)}>
          LogOut 👨🏼‍🦯
        </a>
      )}

      <div className="header__paths">
        <Link to="/products"> Products </Link>
        <Link to="/basket"> Basket </Link>
      </div>
    </div>
  );
}
