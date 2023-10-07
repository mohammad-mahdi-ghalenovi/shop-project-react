import React, { useEffect } from "react";

export default function Product(props) {
  let { id, name, price, getProductID, isLoading, redirectToProductPage } =
    props;

  function clickHandler(id) {
    getProductID(id);
  }

  function sendProductId(id) {
    redirectToProductPage(id);
  }

  return (
    <>
      <div className="product" onClick={() => sendProductId(id)}>
        <h4 className="product__name">{name}</h4>
        <p className="product__price">${price}</p>
        <button onClick={() => clickHandler(id)}>
          {isLoading ? "Loading..." : "Add to cart"}
        </button>
      </div>
    </>
  );
}
