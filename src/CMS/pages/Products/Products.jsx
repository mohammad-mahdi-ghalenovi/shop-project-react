import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Link } from "react-router-dom";
import { getAllProducts } from "../../../utils";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import "./Products.css";

export default function Products() {
  const [productInfos, setProductInfos] = useState();

  useEffect(() => {
    const getProducts = async () => {
      setProductInfos((await getAllProducts()).map((product) => product[1]));
    };

    getProducts();
  }, []);

  const removeProduct = (productID) => {
    setProductInfos(productInfos.filter((product) => product.id !== productID));
  };

  let columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "products",
      headerName: "Products",
      renderCell: (params) => {
        return (
          <div className="products-infos">
            <img
              src={params.row.picture}
              className="products-infos__pictures"
              alt=""
            />
            <p className="products-infos__name">{params.row.name}</p>
          </div>
        );
      },
      width: 150,
    },
    { field: "price", headerName: "Price", width: 90 },
    {
      field: "action",
      headerName: "Action",
      renderCell: (params) => {
        return (
          <div className="products-actions">
            <Link
              to={`/cms/product/${params.row.id}`}
              className="actions__button"
            >
              Edit
            </Link>
            <DeleteOutlineIcon
              className="actions__remove"
              onClick={() => removeProduct(params.row.id)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="products-container">
      {productInfos ? (
        <DataGrid columns={columns} rows={productInfos} />
      ) : (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
    </div>
  );
}
