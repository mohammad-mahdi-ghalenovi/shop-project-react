import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./Chart.css";

export default function Chart({ title, data, xDataKey, lineDataKey,  grid , width ,isYAxisVisible }) {
  return (
    <div className="rechart-container">
      <h4>{title}</h4>
      <ResponsiveContainer aspect={4} width={`${width}%`} >
        <LineChart data={data} >
          <Line type="monotone" dataKey={lineDataKey} stroke="#4825E5" />
          {grid && <CartesianGrid stroke="#ccc" />}
          <XAxis dataKey={xDataKey} />
          {isYAxisVisible && <YAxis />}
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
