import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Link } from "react-router-dom";
import { users } from "../../../data";
import "./UsersList.css";

export default function UserList() {
  const [usersInfo, setUsersInfo] = useState(users);

  const removeUser = (userID) => {
    setUsersInfo(usersInfo.filter((user) => user.id !== userID));
  };

  let columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      renderCell: (params) => {
        return (
          <div className="user-infos">
            <img
              src={params.row.profile}
              className="user-infos__profile"
              alt=""
            />
            <p className="user-infos__name">{params.row.name}</p>
          </div>
        );
      },
      width: 150,
    },
    { field: "email", headerName: "Email", width: 200 },
    { field: "transaction", headerName: "Transaction", width: 150 },
    {
      field: "action",
      headerName: "Action",
      renderCell: (params) => {
        return (
          <div className="user-actions">
            <Link to={`/user/${params.row.id}`} className="actions__button">
              {" "}
              Edit
            </Link>
            <DeleteOutlineIcon
              className="actions__remove"
              onClick={() => removeUser(params.row.id)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="users-container">
      <DataGrid rows={usersInfo} columns={columns} />
    </div>
  );
}
