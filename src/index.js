import React from "react";
import ReactDOM from "react-dom/client";
import './assets/scss/style.scss';
import { BrowserRouter, Navigate, Route, Routes, unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import HomeTemplate from "./templates/HomeTemplate";
import Home from "./pages/Home/Home";


import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Search from "./pages/Search/Search";
import Profile from "./pages/Profile/Profile";
import { Provider } from "react-redux";
import { store } from "./redux/ConfigStore";
import LoginTemplate from "./templates/LoginTemplate";
import { createBrowserHistory } from "history";
import Cart from "./pages/Cart/Cart";
import Detail from "./pages/Detail/Detail";
export const history = createBrowserHistory();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Provider store={store}>
      <HistoryRouter history={history}>
        <Routes>
          <Route path="" element={<HomeTemplate />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="detail/:productID" element={<Detail />} />
            <Route path="cart" element={<Cart/>} />
            <Route path="search" element={<Search />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
          <Route path="users" element={<LoginTemplate />}> 
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            {/* <Route path="*" element={<Navigate to="/users/login" />} /> */}
          </Route>
        </Routes>
      </HistoryRouter>
    </Provider>
  </>
);
