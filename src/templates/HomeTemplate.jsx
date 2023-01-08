import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Navbar from "../components/Header/Navbar";
import { getAllProductApi } from ".././redux/reducers/productReducer";
import { cartLoadReducer } from "../redux/reducers/cartReducer";

const HomeTemplate = () => {
  const dispatch = useDispatch();
  const getLocal = () => {
    const data = localStorage.getItem("cart");
    if (data) dispatch(cartLoadReducer(JSON.parse(data)));
  };

  useEffect(() => {
    dispatch(getAllProductApi);
    getLocal();
  }, []);
  return (
    <div>
      <Header />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default HomeTemplate;
