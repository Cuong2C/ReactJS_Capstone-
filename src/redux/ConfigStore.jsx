import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './reducers/cartReducer';
import productReducer from './reducers/productReducer';
import productReducer02 from './reducers/ProductReducer/productReducer02';
import userReducer from './reducers/userReducer/userReducer';


export const store = configureStore({
    reducer: {
        userReducer: userReducer,
        productReducer: productReducer02,
        productData: productReducer,
        cartData: cartReducer
    }
});


