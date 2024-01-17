import React, { useEffect, useState } from "react";

export default function Product(props) {
  let {
    id,
    name,
    price,
    picture,
    getProductID,
    isLoading,
    off,
    redirectToProductPage,
    productInfoWithoutOff,
  } = props;

  function clickHandler(id, event) {
    event.stopPropagation();
    getProductID(id);
  }

  function sendProductId(id, event) {
    event.stopPropagation();
    redirectToProductPage(id);
  }

  return (
    <>
      <div className="product" onClick={(event) => sendProductId(id, event)}>
        <img className="product__img" src={picture} />
        <h4 className="product__name">{name}</h4>
        <p className="product__price">
          {off > 0 && (
            <del>
              $
              {productInfoWithoutOff &&
                productInfoWithoutOff.find((product) => product.id == id).price}
            </del>
          )}
          ${price}
        </p>
        {off > 0 && <p className="product__OFF">off : {off}%</p>}
        <button
          onClick={(event) => clickHandler(id, event)}
          className="product-addtocart"
        >
          {isLoading ? "Loading..." : "Add to cart"}
        </button>
      </div>
    </>
  );
}
