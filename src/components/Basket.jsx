import React, { useEffect, useState } from "react";
import { findUser, putUser, getUserFromCookie } from "../utils";
import Header from "./Header";

export default function Basket() {
  const [user, setUser] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  let sum = 0;

  useEffect(() => {
    async function getUser() {
      let mainUser = await findUser(getUserFromCookie().userToken);

      setUser(mainUser[1]);
    }

    getUser();
  }, []);

  useEffect(() => {
    user &&
      user.basket
        .filter((product) => product.id !== 0)
        .map((product) => {
          sum = sum + product.count * product.price;
          setTotalPrice(sum);
        });
    async function putNewBasket() {
      await putUser(getUserFromCookie().userToken, user);
    }

    putNewBasket();
  }, [user]);

  // 🎈 Change count of products 🎈
  const decreaseCountHandler = (productID) => {
    const updatedBasket = user.basket.map((product) => {
      if (product.id === productID) {
        if (product.count <= 1) {
          product.id = 0;
        } else {
          return { ...product, count: product.count - 1 };
        }
      }
      return product;
    });

    const updatedUser = { ...user, basket: updatedBasket };
    setUser(updatedUser);
  };

  const increaseCountHandler = (productID) => {
    const updatedBasket = user.basket.map((product) => {
      if (product.id === productID) {
        return { ...product, count: product.count + 1 };
      }
      return product;
    });

    const updatedUser = { ...user, basket: updatedBasket };
    setUser(updatedUser);
  };
  // 🎈 Change count of products 🎈

  // 🎈 Remove products 🎈
  const removeProductHandler = (productID) => {
    const updatedBasket = user.basket.map((product) => {
      if (product.id === productID) {
        return { ...product, id: 0 };
      }
      return product;
    });

    const updatedUser = { ...user, basket: updatedBasket };
    setUser(updatedUser);
  };
  // 🎈 Remove products 🎈

  return (
    <>
      <Header />
      <h1>Basket</h1>
      {user &&
        user.basket
          .slice(1)
          .filter((product) => product.id !== 0)
          .map((product) => (
            <h2 key={product.id + Math.random()} style={{ color: "Red" }}>
              <button onClick={() => decreaseCountHandler(product.id)}>
                -
              </button>
              {product.name} X {product.count}
              <button onClick={() => increaseCountHandler(product.id)}>
                +
              </button>
              <button onClick={() => removeProductHandler(product.id)}>
                Delete
              </button>
            </h2>
          ))}

      <h1>total Price : {totalPrice ? totalPrice : 0}</h1>
    </>
  );
}
