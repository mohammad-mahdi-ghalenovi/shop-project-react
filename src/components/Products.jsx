import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Product from "./Product";
import { findUser, putUser, getUserFromCookie } from "./../utils";

export default function Products() {
  const [user, setUser] = useState();

  let params = useParams();

  useEffect(() => {
    setUser(getUserFromCookie());
  }, []);

  let productInfos = [
    { id: 1, name: "Mouse", price: 200, count: 1 },
    { id: 2, name: "Kayboard", price: 300, count: 1 },
    { id: 3, name: "MousePad", price: 10, count: 1 },
  ];

  const addProductToCart = async (productID) => {
    let mainProduct = productInfos.find((product) => product.id === productID);
    let mainUser = await findUser(user.userToken);
    let isCount = false;

    mainUser[1].basket.some((product) => {
      if (product.id == mainProduct.id) {
        product.count = product.count + 1;
        isCount = true;
      }
    });

    if (!isCount) {
      mainUser[1].basket.push(mainProduct);
      isCount = false;
    }

    await putUser(getUserFromCookie().userToken, mainUser[1]);
  };

  return (
    <>
      <div className="product-container">
        {productInfos.map((product) => (
          <Product
            key={product.id}
            {...product}
            addProductToCart={addProductToCart}
          />
        ))}
      </div>

      <Link to={"/basket"}>Basket</Link>
    </>
  );
}
