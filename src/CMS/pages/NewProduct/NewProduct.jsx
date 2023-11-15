import React, { useState, useEffect } from "react";
import { addNewProduct } from "../../../utils";
import Alert from "@mui/material/Alert";
import "./NewProduct.css";

export default function NewProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [picture, setPicture] = useState("");
  const [isSucceeded, setIsSucceeded] = useState("");

  useEffect(() => {
    isSucceeded &&
      setTimeout(() => {
        setIsSucceeded(false);
      }, 3000);
  }, [isSucceeded]);

  const handleNewProduct = () => {
    if (name.length >= 1 && price.length >= 1 && picture.length >= 1) {
      let newProduct = {
        name,
        price,
        picture,
        off: 0,
        count: 1,
        isLoding: false,
        sales: [],
      };

      if (addNewProduct(newProduct)) {
        setIsSucceeded(true);
        setName("");
        setPrice("");
        setPicture("");
      } else {
        setIsSucceeded(false);
      }
    }
  };

  return (
    <div className="newProduct-container">
      {isSucceeded && (
        <Alert variant="filled" severity="success">
          User Edited Successfully — check it out!
        </Alert>
      )}

      <div className="newProduct-wrapper">
        <input
          type="text"
          placeholder="name :"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          type="number"
          placeholder="price :"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
        <input
          type="text"
          placeholder="Pircture : (src) "
          onChange={(e) => setPicture(e.target.value)}
          value={picture}
        />
      </div>

      <button className="submit-product" onClick={handleNewProduct}>
        Submit
      </button>
    </div>
  );
}
