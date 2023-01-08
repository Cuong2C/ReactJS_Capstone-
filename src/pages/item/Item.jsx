import React from "react";
import { Link } from "react-router-dom";

const Item = ({ item }) => {
  return (
    <div className="item mb-3">
      <div className="card">
        <img src={item.image} alt="" className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title">
            <Link to={`/detail/${item.id}`}>{item.name}</Link>
          </h5>
          <p className="card-text">{item.shortDescription}</p>
        </div>
        <div className="card-footer-custom">
          <div className="card-footer-custom-left">Buy now</div>
          <div className="card-footer-custom-right">$85</div>
        </div>
      </div>
    </div>
  );
};

export default Item;