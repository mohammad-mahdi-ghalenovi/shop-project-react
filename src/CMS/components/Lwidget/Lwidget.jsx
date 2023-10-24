import React from "react";
import "./Lwidget.css";

export default function Lwidget({ name, date, amount, status, profile }) {
  const Button = ({type}) => {
    return <button className={"status-button " + type}>{type}</button>;
  };

  return (
    <tr className="largewidget-container">
      <td className="largewidget__customer">
        <img src={profile} alt="" className="customer-profile" />
        <p className="customer-name">{name}</p>
      </td>
      <td className="largewidget__date">{date}</td>
      <td className="largewidget__amount">${amount}</td>
      <td className="largewidget__status">
        <Button type={status}>{status}</Button>
      </td>
    </tr>
  );
}
