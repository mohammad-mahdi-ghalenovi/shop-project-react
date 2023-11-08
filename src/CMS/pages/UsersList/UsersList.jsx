import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { Link } from "react-router-dom";
import { getAllUsers, deleteUser } from "../../../utils";
import "./UsersList.css";

export default function UserList() {
  const [users, setUsers] = useState();

  useEffect(() => {
    const getDatas = async () => {
      setUsers(await getAllUsers());
    };

    getDatas();
  }, []);

  const removeUser = async (userID) => {
    let mainUser = users.find((user) => {
      return user[1].id == userID;
    });

    await deleteUser(mainUser[0]);
    const updatedUsers = users.filter((user) => user[1].id !== userID);
    setUsers(updatedUsers);
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
    { field: "password", headerName: "Password", width: 200 },
    {
      field: "action",
      headerName: "Action",
      renderCell: (params) => {
        return (
          <div className="user-actions">
            <Link to={`/cms/user/${params.row.id}`} className="actions__button">
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
      {users ? (
        <DataGrid rows={users.map((user) => user[1])} columns={columns} />
      ) : (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
    </div>
  );
}
