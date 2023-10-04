import React, { useEffect } from "react";

export default function Product(props) {
  let { id, name, price, getProductID, isLoading } = props;

  function clickHandler(id) {
    getProductID(id);
  }

  return (
    <>
      <div className="product">
        <h4 className="product__name">{name}</h4>
        <p className="product__price">${price}</p>
        <button onClick={() => clickHandler(id)}>
          {isLoading ? "Loading..." : "Add to cart"}
        </button>
      </div>
    </>
  );
}
