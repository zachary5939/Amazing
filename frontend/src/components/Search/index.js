import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import { fetchRatingsForProducts } from "../../store/ratings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import * as productActions from "../../store/products";
import "../Products/products.css";
import depressing from "../../img/depressing.png";
import "./search.css";

function Search() {
  const dispatch = useDispatch();
  const searchedProducts = useSelector((state) => state.products.searchedProducts);
  const ratings = useSelector((state) => state.ratings?.items || []);
  const location = useLocation();
  const searchTerm = new URLSearchParams(location.search).get('term');

  useEffect(() => {
    if (searchTerm) {
      dispatch(productActions.resetSearchState());
      dispatch(productActions.searchProductsByName(searchTerm));
    }
  }, [dispatch, searchTerm]);

  useEffect(() => {
    if (searchedProducts && Object.keys(searchedProducts).length) {
      const productIds = Object.values(searchedProducts).map(product => product.id);
      dispatch(fetchRatingsForProducts(productIds));
    }
  }, [dispatch, searchedProducts]);

  const getAverageRating = (productId) => {
    const productRatings = ratings.filter(
      (rating) => String(rating.productId) === String(productId)
    );
    const total = productRatings.reduce(
      (acc, rating) => acc + rating.rating,
      0
    );
    return productRatings.length
      ? parseFloat((total / productRatings.length).toFixed(2))
      : null;
  };

  const StarRating = ({ average }) => {
    if (average === null) return "No reviews";

    const fullStars = Math.floor(average);
    const halfStars = average % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
      <div>
        {[...Array(fullStars)].map((_, index) => (
          <FontAwesomeIcon className="star" icon={faStar} key={index} />
        ))}
        {[...Array(halfStars)].map((_, index) => (
          <FontAwesomeIcon className="star" icon={faStarHalfAlt} key={index} />
        ))}
        {[...Array(emptyStars)].map((_, index) => (
          <FontAwesomeIcon
            className="star"
            icon={faStar}
            key={index}
            opacity={0.2}
          />
        ))}
      </div>
    );
  };
  const renderSearchResults = () => {
    console.log("Rendering search results with:", searchedProducts);
    if (Object.values(searchedProducts || {}).length > 0) {
      return Object.values(searchedProducts).map((product) => (
        <div key={product.id} className="product-item">
          <Link to={`/products/${product.id}`}>
            <div className="image-container">
            <img src={product?.imageUrl} alt={product?.name} />
            </div>
          </Link>
          <div className="product-details">
            <h3 className="product-name">
              <Link to={`/products/${product.id}`}>{product?.name}</Link>
            </h3>
            <p className="description">{product?.description}</p>
            <div>
              <StarRating average={getAverageRating(product?.id)} />
            </div>
            <p className="product-price">Price: ${product?.price}</p>
          </div>
        </div>
      ));
    } else {
      return (
        <div className="not-found-container">
          <h2 className="not-found-heading">Product Not Found</h2>
          <img src={depressing} alt="Not Found" className="not-found-img" />
        </div>
      );
    }
  };
  return (
    <div>
      <h2 className="category-name">Search Results</h2>
      <div className="products-container">
        {renderSearchResults()}
      </div>
    </div>
  );

}

export default Search;
