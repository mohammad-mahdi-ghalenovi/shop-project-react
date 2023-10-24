import React from "react";
import Feature from "./Feature";
import "./Feature.css"

export default function Features() {
  let featuresInfos = [
    { id: 1, title: "Revanue", price: "2,415", status: -11.4 },
    { id: 2, title: "Sales", price: "4,415", status: -1.4 },
    { id: 3, title: "Cost", price: "2,415", status: +2.4 },
  ];

  return (
    <div className="features-container">
      {featuresInfos.map((feature) => (
        <Feature key={feature.id} {...feature} />
      ))}
    </div>
  );
}
