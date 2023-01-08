import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/config";

const initialState = {
  productData: [],
  productDetail: {},
};

const productReducer = createSlice({
  name: "productDataReducer", //type: name/function name: productDataReducer/updateProductData
  initialState,
  reducers: {
    updateProductData: (state, action) => {
      state.productData = action.payload;
    },
    updateProductDetail: (state, action) => {
      state.productDetail = action.payload;
    },
  },
});

export const { updateProductData, updateProductDetail } =
  productReducer.actions;

export default productReducer.reducer;

/***************** async action *************/

export const getAllProductApi = async (dispatch) => {
  try {
    const get = await http.get("/api/Product");
    const updateDataAction = updateProductData(get.data.content);
    dispatch(updateDataAction);
  } catch (error) {
    console.log(error);
  }
};

export const getProductDetailApi = (productId) => {
  return async (dispatch) => {
    try {
      const get = await http.get(`/api/Product/getbyid?id=${productId}`);
      const updateProductDetailAction = updateProductDetail(get.data.content);
      dispatch(updateProductDetailAction);
    } catch (error) {
      console.log(error);
    }
  };
};