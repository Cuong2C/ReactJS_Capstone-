import React from "react";
import { useDispatch } from "react-redux";
import { addToCartReducer } from "../../redux/reducers/cartReducer";

const CartTable = (props) => {
  const { item } = props;
  const dispatch = useDispatch();
  const totalCounting = (price, quantity) => {
    return price * quantity;
  };
  return (
    <tr>
      <td>
        <img
          style={{ width: "90px", height: "50px", objectFit: "cover" }}
          src={item.image}
          alt="product"
        />
      </td>
      <td>
        {item.name.length > 15 ? item.name.substring(0, 15) + "..." : item.name}
      </td>
      <td>
        <button
          className="btn btn-primary button-detail"
          disabled={item.quantity <= 1 ? true : false}
          onClick={() =>
            dispatch(
              addToCartReducer({
                ...item,
                quantity: -1,
              })
            )
          }
        >
          -
        </button>
        {item.quantity}
        <button
          className="btn btn-primary button-detail"
          onClick={() =>
            dispatch(
              addToCartReducer({
                ...item,
                quantity: 1,
              })
            )
          }
        >
          +
        </button>
      </td>
      <td>${item.price}</td>
      <td>${totalCounting(item.price, item.quantity)}</td>
    </tr>
  );
};

export default CartTable;