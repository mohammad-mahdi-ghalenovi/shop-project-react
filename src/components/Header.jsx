import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { findUser, getUserFromCookie, isUserLogin } from "../utils";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    async function fetchUsers() {
      setIsLogin(await isUserLogin());
      setUser(await findUser(getUserFromCookie().userToken));
    }

    fetchUsers();
  }, []);

  const logOutUser = (event) => {
    event.preventDefault();
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie; // if cookie have an equal sign
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }

    window.location = window.location;
    setIsLogin(false);
  };

  return (
    <div className="header">
      {isLogin ? (
        <>
          {user ? (
            <>
              {"Welcome " + user[1].name}
              <a href="" onClick={(e) => logOutUser(e)}>
                LogOut 👨🏼‍🦯
              </a>
            </>
          ) : (
            <Box sx={{ width: "50%" }}>
              <LinearProgress />
            </Box>
          )}
        </>
      ) : (
        <div className="header__actions">
          <Link to="/login"> Login </Link>
          <Link to="/signup"> SignUp </Link>
        </div>
      )}

      <div className="header__paths">
        <Link to="/basket"> Basket </Link>
        <Link to="/cms"> CMS </Link>
        <Link to="/"> Home </Link>
      </div>
    </div>
  );
}
