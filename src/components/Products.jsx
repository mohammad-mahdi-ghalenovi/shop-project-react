import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Product from "./Product";
import { findUser, putUser, getUserFromCookie, isUserLogin } from "../utils";
import { products } from "./../data";

export default function Products() {
  const [productInfos, setProductInfos] = useState(products);
  const [user, setUser] = useState();
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchDatas() {
      setIsLogin(await isUserLogin());
      setUser(await findUser(getUserFromCookie().userToken));
    }

    fetchDatas();
  }, []);

  let navigate = useNavigate();

  // get product ID from Product Component
  const getProductID = (productID) => {
    addProductToCart(productID);
  };

  const loginNotifHandler = () => {
    alert("login first");
  };

  const addProductToCart = async (productID) => {
    let mainProduct = productInfos.find((product) => product.id === productID);
    let isCount = false;

    mainProduct.isLoading = true;
    setIsLoading(true);

    user[1].basket.some((product) => {
      if (product.id == mainProduct.id) {
        product.count = product.count + 1;
        isCount = true;
      }
    });

    if (!isCount) {
      user[1].basket.push(mainProduct);
      isCount = false;
    }

    let update = await putUser(getUserFromCookie().userToken, user[1]);
    if (update) {
      mainProduct.isLoading = false;
      setIsLoading(false);
    }
  };

  const redirectToProductPage = (productID) => {
    console.log(productID);
    navigate(`/product/${productID}`);
  };

  return (
    <>
      <div className="product-container">
        {productInfos &&
          productInfos.map((product) => (
            <Product
              key={product.id}
              {...product}
              getProductID={isLogin ? getProductID : loginNotifHandler}
              redirectToProductPage={redirectToProductPage}
            />
          ))}
      </div>
    </>
  );
}
