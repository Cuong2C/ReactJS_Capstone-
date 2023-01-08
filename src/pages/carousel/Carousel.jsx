import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addToCartReducer } from "../../redux/reducers/cartReducer";
import { getProductDetailApi } from "../../redux/reducers/productReducer";
import Item from "../item/Item";

const Carousel = () => {
  const { productID } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productDetail } = useSelector((store) => store.productData);
  const [quantity, setQuantity] = useState(1);
  const addToCartHandle = () => {
    dispatch(
      addToCartReducer({
        ...productDetail,
        quantity,
      })
    );
    navigate("/cart");
  };
  useEffect(() => {
    dispatch(getProductDetailApi(productID));
  }, [productID]);
  return (
    <div className="container-fluid">
      <div className="row detail">
        <div className="col-4">
          <img src={productDetail?.image} alt="" />
        </div>
        <div className="col-8">
          <h1 className="pro-name">{productDetail?.name}</h1>
          <p className="pro-des">{productDetail?.description}</p>
          <h2 className="pro-ava">Available</h2>
          <ul>
            {productDetail?.size?.map((item, index) => {
              return <li key={index}>{item}</li>;
            })}
          </ul>
          <div>$ {productDetail?.price}</div>
          <div>
            <button
              className="btn btn-primary"
              onClick={() => {
                if (quantity >= 1) setQuantity(quantity - 1);
              }}
              disabled={quantity <= 1 ? true : false}
            >
              -
            </button>
            {quantity}
            <button
              className="btn btn-primary"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
          <div>
            <button className="btn btn-info" onClick={addToCartHandle}>
              ADD TO CART
            </button>
          </div>
        </div>
      </div>

      <h1>RELATED PRODUCTS</h1>
      <div className="row product-feature">
        {productDetail?.relatedProducts?.map((item, index) => (
          <Item key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Carousel;