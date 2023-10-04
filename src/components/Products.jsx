import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Product from "./Product";
import { findUser, putUser, getUserFromCookie, getAllUsers } from "./../utils";

export default function Products() {
  const [productInfos, setProductInfos] = useState([
    { id: 1, name: "Mouse", price: 200, count: 1, isLoading: false },
    { id: 2, name: "Kayboard", price: 300, count: 1, isLoading: false },
    { id: 3, name: "MousePad", price: 10, count: 1, isLoading: false },
  ]);
  const [user, setUser] = useState();
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    async function fetchUsers() {
      isUserLogin(await getAllUsers());
      setUser(await findUser(getUserFromCookie().userToken));
    }

    fetchUsers();
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
