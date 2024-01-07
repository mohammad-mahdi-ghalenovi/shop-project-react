import React, { useEffect, useState } from "react";
import { getAllProducts } from "../utils";

export default function Product(props) {
  const [incomeProductInfo, setIncomeProductInfo] = useState();

  let { id, name, price , picture, getProductID, isLoading, off, redirectToProductPage } =
    props;

  useEffect(() => {
    async function fetchDatas() {
      setIncomeProductInfo(
        (await getAllProducts()).map((product) => product[1])
      );
    }

    fetchDatas();
  }, []);

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
        <img className="product__img" src={picture}/>
        <h4 className="product__name">{name}</h4>
        <p className="product__price">
          {off > 0 && (
            <del>
              $
              {incomeProductInfo &&
                incomeProductInfo.find((product) => product.id == id).price}
            </del>
          )}
          ${price}
        </p>
        {off > 0 && <p className="product__OFF">off : {off}%</p>}
        <button onClick={(event) => clickHandler(id, event)} className="product-addtocart">
          {isLoading ? "Loading..." : "Add to cart"}
        </button>
      </div>
    </>
  );
}
