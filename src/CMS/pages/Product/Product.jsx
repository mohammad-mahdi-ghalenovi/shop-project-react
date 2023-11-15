import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllProducts, putProduct } from "../../../utils";
import Chart from "./../../components/Chart/Chart";
import "./Product.css";

export default function Product() {
  const [productsInfo, setProductsInfo] = useState();
  const [mainProduct, setMainProduct] = useState();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [picture, setPicture] = useState("");
  const [offPercent, setOffPercent] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      setProductsInfo(await getAllProducts());
    };

    getProducts();
  }, []);

  useEffect(() => {
    productsInfo &&
      setMainProduct(
        productsInfo.find((product) => product[1].id == params.productID)
      );
  }, [productsInfo]);

  let params = useParams();

  const editToggler = () => {
    setName(mainProduct[1].name);
    setPrice(mainProduct[1].price);
    setPicture(mainProduct[1].picture);
    setOffPercent(mainProduct[1].off);

    setIsEditing((prev) => !prev);
  };

  const submitEditedProduct = async () => {
    let updatedProduct = { ...mainProduct[1] };

    updatedProduct.name = name;
    updatedProduct.price = price;
    updatedProduct.picture = picture;
    updatedProduct.off = offPercent;

    let isSuccess = await putProduct(updatedProduct, mainProduct[0]);

    if (isSuccess) {
      setIsEditing(false);
      setMainProduct([mainProduct[0] , updatedProduct]);
    }
  };

  return (
    <div className="product-container">
      <div className="product-wrapper">
        <div className="product-chart">
          {mainProduct && (
            <Chart
              data={mainProduct[1].sales}
              title="Product Sales Analytics"
              xDataKey="month"
              lineDataKey="sale"
              width={100}
            />
          )}
        </div>

        {mainProduct && (
          <div className="product-infos">
            <div className="product-infos-header">
              <img
                src={mainProduct[1].picture}
                alt=""
                className="product-header__picture"
              />
              <span className="product-header__name">
                {mainProduct[1].name}
              </span>
            </div>
            <div className="product-infos__list">
              <span className="list__item">
                <p className="title">ID : </p>
                <p className="content">{mainProduct[1].id}</p>
              </span>
              <span className="list__item">
                <p className="title">Name : </p>
                <p className="content">{mainProduct[1].name}</p>
              </span>
              <span className="list__item">
                <p className="title">Price : </p>
                <p className="content">${mainProduct[1].price}</p>
              </span>
              <span className="list__item">
                <p className="title">In Stoke :</p>
                <p className="content">YES</p>
              </span>
              <span className="list__item">
                <p className="title">OFF :</p>
                <p className="content">{mainProduct[1].off} %</p>
              </span>
            </div>
          </div>
        )}
      </div>

      {mainProduct && (
        <div className="product-edit">
          <input
            type="text"
            placeholder="New Name: "
            className="product-edit-input"
            value={isEditing ? name : mainProduct[1].name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="New Price: "
            className="product-edit-input"
            value={isEditing ? price : mainProduct[1].price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="text"
            placeholder="New Picture:"
            className="product-edit-input"
            value={isEditing ? picture : mainProduct[1].picture}
            onChange={(e) => setPicture(e.target.value)}
          />
          <input
            type="text"
            placeholder="New Offer:"
            className="product-edit-input"
            value={isEditing ? offPercent : mainProduct[1].off}
            onChange={(e) => setOffPercent(e.target.value)}
          />

          <div className="edit-details-controls">
            <button
              className={
                isEditing ? "edit-details__edit--cancel " : "edit-details__edit"
              }
              onClick={editToggler}
            >
              {isEditing ? "Decline Editing" : "Edit User"}
            </button>
            {isEditing && (
              <button
                className="edit-details__submit"
                onClick={submitEditedProduct}
              >
                Submit Changes
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
