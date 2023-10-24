import React from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import "./SmWidget.css";

export default function SmWidget({ profile, name, position }) {
  return (
    <div className="SmWidget">
      <img className="SmWidget__profile" src={profile} alt="profile" />
      <div className="SmWidget__infos">
        <p className="SmWidget-name">{name}</p>
        <p className="SmWidget-posotion">{position}</p>
      </div>
      <span className="SmWidget__eye">
        <RemoveRedEyeIcon />
      </span>
    </div>
  );
}
