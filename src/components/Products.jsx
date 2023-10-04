import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Product from "./Product";
import { findUser, putUser, getUserFromCookie, getAllUsers } from "./../utils";

export default function Products() {
  const [user, setUser] = useState();
  const [isLogin, setIsLogin] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    async function fetchUsers() {
      isUserLogin(await getAllUsers());
      setUser(await findUser(getUserFromCookie().userToken));
    }

    fetchUsers();
  }, []);

  let productInfos = [
    { id: 1, name: "Mouse", price: 200, count: 1 },
    { id: 2, name: "Kayboard", price: 300, count: 1 },
    { id: 3, name: "MousePad", price: 10, count: 1 },
  ];

  const isUserLogin = (userData) => {
    let updatedData = userData.map((user) => user[0]);

    let isInputLogin = updatedData.some((userID) => {
      return getUserFromCookie().userToken === userID;
    });

    setIsLogin(isInputLogin);
  };

  const getProductID = (productID) => {
    if (isLogin) {
      addProductToCart(productID);
    } else {
      navigate("/login");
    }
  };

  const addProductToCart = async (productID) => {
    let mainProduct = productInfos.find((product) => product.id === productID);
    let mainUser = await findUser(user[0]);
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
          <Product key={product.id} {...product} getProductID={getProductID} />
        ))}
      </div>
    </>
  );
}
