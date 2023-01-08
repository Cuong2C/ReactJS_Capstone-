import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartData: [],
};

const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addToCartReducer: (state, action) => {
      let { cartData } = state;
      let { payload } = action;
      const index = cartData.findIndex(
        (cartItem) => cartItem.id === payload.id
      );
      if (index !== -1) {
        //nếu tìm ra
        //nếu đã có sản phẩm thì tăng quantity lên
        cartData[index] = {
          ...cartData[index],
          quantity: cartData[index].quantity + payload.quantity,
        };
      } else {
        //nếu chưa có thì tiến hành thêm mới vào cart
        cartData = [...cartData, payload];
      }
      //sau khi thêm mới thì phải update state cũ = cartData đã update => có vùng nhớ mới => rerender giao diện
      state.cartData = cartData;
    },
    cartLoadReducer: (state, action) => {
      state.cartData = action.payload;
    },
  },
});

export const { addToCartReducer, cartLoadReducer } = cartReducer.actions;

export default cartReducer.reducer;
