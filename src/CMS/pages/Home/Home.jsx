import React from "react";
import Features from "../../components/Features/Features";
import Chart from "../../components/Chart/Chart";
import SmWidget from "../../components/SmWidget/SmWidget";
import Lwidget from "../../components/Lwidget/Lwidget";
import { newWidgets } from "./../../../data";
import { transActionWidgets } from "./../../../data";
import {datas} from "./../../../data"
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <Features />

      <div className="chart-wrapper">
        <Chart
          data={datas}
          title="Sales Analytics"
          xDataKey="name"
          lineDataKey="uv"
          width={99}
          isYAxisVisible
          grid
        />
      </div>

      <div className="widgets-container">
        <div className="small-widgets-wrapper">
          <h4>New Join Members</h4>
          {newWidgets.map((user) => {
            return <SmWidget key={user.id} {...user} />;
          })}
        </div>

        <div className="large-widgets-wrapper">
          <h4>Lastest Tracsactions</h4>
          <table className="widget-table">
            <tr>
              <th>Customer</th>
              <th>Date</th>
              <th>Amout</th>
              <th>Status</th>
            </tr>
            {transActionWidgets.map((user) => {
              return <Lwidget key={user.id} {...user} />;
            })}
          </table>
        </div>
      </div>
    </div>
  );
}
