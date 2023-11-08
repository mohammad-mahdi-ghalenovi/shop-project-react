import React, { useState } from "react";
import { addNewProduct } from "../../../utils";
import "./NewProduct.css";

export default function NewProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [picture, setPicture] = useState("");

  const handleNewProduct = () => {
    if (name.length >= 1 && price.length >= 1 && picture.length >= 1) {

      let newProduct = {
        name,
        price,
        picture,
        count: 1,
        isLoding: false,
        sales: [],
      };

      addNewProduct(newProduct)
    }
  };

  return (
    <div className="newProduct-container">
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
