import React from "react";
import routes from "./routes";
import { useRoutes, Outlet } from "react-router-dom";
import "./App.css"

export default function App() {
  let router = useRoutes(routes);

  return (
    <div>
      {router}
      <Outlet />
    </div>
  );
}
