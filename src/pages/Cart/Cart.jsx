import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CartTable from "./CartTable";
import {
  addToCart,
  checkAll,
  checkItem,
  deleteCartItem,
  sendOrderApi,
} from "../../redux/reducers/cartReducer";

const Cart = () => {
  const { cartData } = useSelector((store) => store.cartData);
  const saveLocal = () => {
    const data = JSON.stringify(cartData);
    localStorage.setItem("cart", data);
  };

  useEffect(() => {
    saveLocal();
  }, [cartData]);

  return (
    <div className="profile">
      <div className="profile__wrapper">
        <div className="profile__container">
          <div className="profile__content">
            <div className="profile__tabs-info">
              <div>
                <table className="table">
                  <thead>
                    <tr>
                      <th style={{ width: "20%" }}>Image</th>
                      <th>Name</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartData?.map((item, index) => {
                      return <CartTable item={item} key={index} />;
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
