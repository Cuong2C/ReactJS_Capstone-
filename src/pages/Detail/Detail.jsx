import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import cartReducer, { addToCartReducer } from "../../redux/reducers/cartReducer";
import { getProductDetailApi } from "../../redux/reducers/productReducer";
import ShoeCard from "../../components/ShoeCard/ShoeCard";
import {
  getProductFavoriteAPI,
  likeProductAPI,
  unLikeProductAPI,
} from "../../redux/reducers/ProductReducer/productReducer02";

const Detail = () => {
  const { productID } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productDetail } = useSelector((store) => store.productData);
  const [quantity, setQuantity] = useState(1);
  const { userLogin } = useSelector((state) => state.userReducer);
  const { arrProduct, arrProductFavorite } = useSelector(
    (state) => state.productReducer
  );

  const addToCartHandle = () => {
    dispatch(
      addToCartReducer({
        ...productDetail,
        quantity,
      })
    );
    navigate("/cart");
  };

  const getProductFavorite = () => {
    if (userLogin) {
      const actionProductFavorite = getProductFavoriteAPI();
      dispatch(actionProductFavorite);
    }
  };

  const handleLikeProduct = async (id) => {
    return await likeProductAPI(id)
      .then((res) => {
        if (!res) {
          return;
        }
        getProductFavorite();
      })
      .catch((err) => console.log({ err }));
  };

  const handleUnLikeProduct = async (id) => {
    return await unLikeProductAPI(id)
      .then((res) => {
        if (!res) {
          return;
        }
        getProductFavorite();
      })
      .catch((err) => console.log(err));
  };

  const renderHeart = (prod) => {
    <i
      className="fa-regular fa-heart"
      onClick={() => handleLikeProduct(prod.id)}
    ></i>;
    if (arrProductFavorite) {
      if (
        arrProductFavorite?.productsFavorite.some((item) => item.id === prod.id)
      ) {
        return (
          <i
            className="fa-solid fa-heart"
            onClick={() => handleUnLikeProduct(prod.id)}
          ></i>
        );
      } else {
        return (
          <i
            className="fa-regular fa-heart"
            onClick={() => handleLikeProduct(prod.id)}
          ></i>
        );
      }
    }
  };

  useEffect(() => {
    dispatch(getProductDetailApi(productID));
    
  }, [productID]); 

  return (
    <div className="container-fluid home">
      <div className="row detail-top">
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
          <div className="pro-price">$ {productDetail?.price}</div>
          <div>
            <button
              className="btn btn-primary button-detail"
              onClick={() => {
                if (quantity >= 1) setQuantity(quantity - 1);
              }}
              disabled={quantity <= 1 ? true : false}
            >
              -
            </button>
            {quantity}
            <button
              className="btn btn-primary button-detail"
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
      <div className="detail-container home__product">
        <h1>Related Products</h1>
        <div className="product__container">
          <div className="product__content row">
            {productDetail?.relatedProducts?.map((item, index) => {
              return (
                <div
                  className="product__item col-12 col-sm-6 col-lg-4"
                  key={index}
                >
                  <div className="product__card">
                    {userLogin ? (
                      <div className="heart">{renderHeart(item)}</div>
                    ) : (
                      <div className="heart">
                        <i className="fa-regular fa-heart"></i>
                      </div>
                    )}
                    <ShoeCard prod={item} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;