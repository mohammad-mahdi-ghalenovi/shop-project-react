import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "./../../../data";
// import Chart from "./../../components/Chart/Chart";
import "./Product.css";

export default function Product() {
  const [productsInfo, setProductsInfo] = useState(products);
  const [mainProduct, setMainProduct] = useState();

  useEffect(() => {
    setMainProduct(
      productsInfo.find((product) => product.id == params.productID)
    );
  }, []);

  let params = useParams();

  return (
    <>
      <div className="product-container">
        <div className="product-chart">
          {/* {mainProduct && (
            <Chart
              data={mainProduct.sales}
              title="Product Sales Analytics"
              xDataKey="month"
              lineDataKey="sale"
              width={100}
            />
          )} */}
        </div>

        {mainProduct && (
          <div className="product-infos">
            <div className="product-infos-header">
              <img
                src={ mainProduct.picture}
                alt=""
                className="product-header__picture"
              />
              <span className="product-header__name">{mainProduct.name}</span>
            </div>
            <div className="product-infos__list">
              <span className="list__item">
                <p className="title">ID : </p>
                <p className="content">{mainProduct.id}</p>
              </span>
              <span className="list__item">
                <p className="title">Name : </p>
                <p className="content">{mainProduct.name}</p>
              </span>
              <span className="list__item">
                <p className="title">Price : </p>
                <p className="content">${mainProduct.price}</p>
              </span>
              <span className="list__item">
                <p className="title">In Stoke :</p>
                <p className="content">YES</p>
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
