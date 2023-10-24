import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PublicIcon from "@mui/icons-material/Public";
import SettingsIcon from "@mui/icons-material/Settings";
import "./TopBar.css";

export default function TopBar() {
  return (
    <>
      <div className="topbar-container">
        <div className="topbar__logo">MettiLearn</div>
        <div className="topbar__infos">
          <div className="info infos__notif">
            <span className="badge">3</span>
            <NotificationsIcon />
          </div>
          <div className="info infos__globe">
            <span className="badge">3</span>
            <PublicIcon />
          </div>
          <div className="info infos__setting">
            <SettingsIcon />
          </div>
          <img src="/shutterstock_648907024.jpg" className="infos__avatar" />
        </div>
      </div>
    </>
  );
}
