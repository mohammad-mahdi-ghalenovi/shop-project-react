import React from "react";

export default function Product(props) {
  let { id, name, price, addProductToCart } = props;

  function clickHandler (id) {
    addProductToCart(id)
  }

  return (
    <>
      <div className="product">
        <h4 className="product__name">{name}</h4>
        <p className="product__price">${price}</p>
        <button onClick={() => clickHandler(id)}>Add to cart</button>
      </div>
    </>
  );
}
