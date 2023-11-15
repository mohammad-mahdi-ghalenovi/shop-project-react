import React from "react";
import routes from "./routes";
import { useRoutes, Outlet } from "react-router-dom";
import "./App.css";

export default function App() {
  let router = useRoutes(routes);

  return (
    <div>
      {router}
      <Outlet />
    </div>
  );
}
//   Off feature on basket when a user already has a product and if the offer end what should i do :) + add success notif in pages wich is necessary