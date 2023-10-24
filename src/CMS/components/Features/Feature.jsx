import React from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

export default function Feature({ title, price, status }) {
  return (
    <div className="feature-wrapper">
      <span className="feature__title">{title}</span>

      <div className="feature-infos">
        <h3 className="feature__price">${price}</h3>
        <span className="feature__status">
          {status < 0 ? (
            <>
              {status}
              <ArrowUpwardIcon style={{ color: "red" , transform : "rotate(180deg)" }} />
            </>
          ) : (
            <>
              +{status}
              <ArrowUpwardIcon style={{ color: "green" }} />
            </>
          )}
        </span>
      </div>

      <span className="feature__date">Compared to last month</span>
    </div>
  );
}
