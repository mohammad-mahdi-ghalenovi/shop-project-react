import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllProducts } from "./../utils";
// import ProductDatas from "../ProductDatas";

export default function ProductPage() {
  const [productInfos, setProductInfos] = useState();
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