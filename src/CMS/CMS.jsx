import React from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import TopBar from "./components/TopBar/TopBar";
import SideBar from "./components/SideBar/SideBar";
import "./CMS.css";

export default function App() {
  let router = useRoutes(routes);

  return (
    <>
      <TopBar />
      
      <div className="main-container">
        <SideBar />
        {router}
      </div>
    </>
  );
}
