import "./Wishlist.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserWishlists, deleteFromWishlist } from "../../store/wishlist";
import { useHistory } from "react-router-dom";
import { fetchAllProducts } from "../../store/products";
// import { fetchRatings } from '../../store/ratings';

function Wishlist() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const userWishlist = useSelector((state) => state.wishlist.items); // Assuming the data is stored here

  useEffect(() => {
    if (sessionUser) {
      dispatch(fetchUserWishlists(sessionUser.id));
      dispatch(fetchAllProducts());
      // dispatch(fetchRatings());
    }
  }, [dispatch, sessionUser]);

  return (
    <div className="wishlist-container">
      <div className="wishlist-header">
        <h1>{sessionUser?.firstName}'s Wishlist</h1>
      </div>
      <div className="wishlist-items">
        {userWishlist.map((item) => (
          <div className="wishlist-item" key={item.id}>
            <img
              src={item?.product?.imageUrl}
              alt={item?.product?.name}
              className="wishlist-item-image"
            />
            <div className="wishlist-item-details">
              <h2>{item?.product?.name}</h2>
              <p>
                Price:{" "}
                {typeof item?.product?.price === "number"
                  ? `$${item.product.price.toFixed(2)}`
                  : `Invalid Price: ${JSON.stringify(item?.product?.price)}`}
              </p>
              <p>{item?.product?.description}</p>
              <div className="wishlist-item-buttons">
                <button
                  onClick={() => history.push(`/products/${item.product.id}`)}
                >
                  View Product
                </button>
                <button
                  onClick={() =>
                    dispatch(
                      deleteFromWishlist(sessionUser.id, item.product.id)
                    )
                  }
                >
                  Remove from Wishlist
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
