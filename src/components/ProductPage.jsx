import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ProductPage() {
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
  const [product, setProduct] = useState();

  let params = useParams();

  useEffect(() => {
    // let mainProduct = productInfos.find(
    //   (product) => product.id == Number(params.productID)
    // );

    async function getProducts() {
      setProductInfos(await getAllProducts());
    }

    getProducts();
  }, []);

  useEffect(() => {
    productInfos && setProduct(productInfos[params.productID - 1]);
  }, [productInfos]);

  return <>{product ? <h1>{product.name}</h1> : "Loading..."}</>;
}
