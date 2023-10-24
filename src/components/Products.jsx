import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Product from "./Product";
import { findUser, putUser, getUserFromCookie, getAllUsers } from "./../utils";

export default function Products() {
  const [productInfos, setProductInfos] = useState([
    {
      id: 1,
      name: "mouse ",
      price: 200,
      count: 1,
      isLoading: false,
    },
    {
      id: 2,
      name: "keyboard",
      price: 300,
      count: 1,
      isLoading: false,
    },
  ]);
  const [user, setUser] = useState();
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    async function fetchDatas() {
      isUserLogin(await getAllUsers());
      setUser(await findUser(getUserFromCookie().userToken));
    }

    fetchDatas();
  }, []);

  const isUserLogin = (userData) => {
    let updatedData = userData.map((user) => user[0]);

    let isInputLogin = updatedData.some((userID) => {
      return getUserFromCookie().userToken === userID;
    });

    setIsLogin(isInputLogin);
  };

  // get product ID from Product Component
  const getProductID = (productID) => {
    if (isLogin) {
      addProductToCart(productID);
    } else {
      navigate("/login");
    }
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
              getProductID={getProductID}
              redirectToProductPage={redirectToProductPage}
            />
          ))}
      </div>
    </>
  );
}
