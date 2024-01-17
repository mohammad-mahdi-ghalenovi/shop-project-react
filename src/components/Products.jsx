import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Product from "./Product";
import { findUser, putUser, getUserFromCookie, isUserLogin } from "../utils";
import { getAllProducts } from "../utils";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

export default function Products() {
  const [incomeProductInfo, setIncomeProductInfo] = useState();
  const [productInfo, setProductInfo] = useState();
  const [productInfoWithoutOff, setProductInfoWithoutOff] = useState();
  const [user, setUser] = useState();
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchDatas() {
      setIsLogin(await isUserLogin());
      setUser(await findUser(getUserFromCookie().userToken));
      setIncomeProductInfo(
        (await getAllProducts()).map((product) => product[1])
      );
    }

    fetchDatas();
  }, []);

  useEffect(() => {
    if (incomeProductInfo) {
      let newProducts = [...incomeProductInfo];

      newProducts.forEach((product) => {
        product.price = product.price - product.price * (product.off / 100);
      });

      setProductInfo(newProducts);
    }
  }, [incomeProductInfo]);

  useEffect(() => {
    if (productInfo) {
      const productsWithoutOff2 = productInfo.map((product) => ({
        ...product,
        price: product.price / (1 - product.off / 100),
      }));

      setProductInfoWithoutOff(productsWithoutOff2);
    }
  }, [productInfo]);

  let navigate = useNavigate();

  // get product ID from Product Component
  const getProductID = (productID) => {
    addProductToCart(productID);
  };

  const loginNotifHandler = () => {
    alert("login first");
  };

  const addProductToCart = async (productID) => {
    let mainProduct = productInfo.find((product) => product.id === productID);
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
      {productInfo ? (
        <div className="products-container">
          {productInfo &&
            productInfo.map((product) => (
              <Product
                key={product.id}
                {...product}
                productInfoWithoutOff={productInfoWithoutOff}
                getProductID={isLogin ? getProductID : loginNotifHandler}
                redirectToProductPage={redirectToProductPage}
              />
            ))}
        </div>
      ) : (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
    </>
  );
}
