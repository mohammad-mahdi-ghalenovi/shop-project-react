import React, { useEffect } from "react";

export default function Product(props) {
  let { id, name, price, getProductID, isLoading, redirectToProductPage } =
    props;

  function clickHandler(id, event) {
    event.stopPropagation();
    getProductID(id);
  }

  function sendProductId(id , event) {
    event.stopPropagation();
    redirectToProductPage(id);
  }

  return (
    <>
      <div className="product" onClick={(event) => sendProductId(id, event)}>
        <h4 className="product__name">{name}</h4>
        <p className="product__price">${price}</p>
        <button onClick={(event) => clickHandler(id , event)}>
          {isLoading ? "Loading..." : "Add to cart"}
        </button>
      </div>
    </>
  );
}
