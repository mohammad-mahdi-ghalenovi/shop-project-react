import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllProducts } from "../utils";

export default function ProductPage() {
  const [productInfos, setProductsInfos] = useState();
  const [product, setProduct] = useState();

  let params = useParams();

  useEffect(() => {
    const getProducts = async () => {
      setProductsInfos((await getAllProducts()).map((product) => product[1]));
    };

    getProducts();
  }, []);

  useEffect(() => {
    productInfos && setProduct(productInfos[params.productID - 1]);
  }, [productInfos]);

  return <>{product ? <h1>{product.name}</h1> : "Loading..."}</>;
}
