import * as productActions from "../../store/products";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { fetchAllRatings, fetchRatingsForProducts } from "../../store/ratings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import "./products.css";

function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.allProducts);
  const { categoryId } = useParams();
  const normalizedProducts = Object.values(products || {});
  const ratings = useSelector((state) => state.ratings?.items || []);
  const searched = useSelector((state) => state.products.searched);

  const searchedProducts = useSelector(
    (state) => state.products.searchedProducts
  );

  useEffect(() => {
    if (categoryId) {
      dispatch(productActions.resetSearchState());
      dispatch(productActions.fetchProductsByCategory(categoryId));
    } else if (searched) {
      return;
    } else {
      dispatch(productActions.fetchAllProducts());
    }
  }, [dispatch, categoryId, searched]);

  //watch for changes in `products`
  useEffect(() => {
    if (products && Object.keys(products).length) {
      const productIds = normalizedProducts.map((product) => product.id);
      dispatch(fetchRatingsForProducts(productIds));
    }
  }, [dispatch, products]);

  const getCategoryName = (categoryId) => {
    if (searched) {
      return "Search Results";
    }

    switch (categoryId) {
      case "1":
        return "Electronics";
      case "2":
        return "Entertainment";
      case "3":
        return "Home Goods";
      case "4":
        return "Grocery";
      default:
        return "All Products";
    }
  };

  const displayProducts = searched
    ? Object.values(searchedProducts)
    : normalizedProducts;

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

  return (
    <div>
      <h2 className="category-name">{getCategoryName(categoryId)}</h2>
      <div className="products-container">
        {displayProducts.map((product) => (
          <div key={product.id} className="product-item">
            <Link to={`/products/${product.id}`}>
              <img src={product.imageUrl} alt={product?.name} />
            </Link>
            <div className="product-details">
              <h3 className="product-name">
                <Link to={`/products/${product.id}`}>{product.name}</Link>
              </h3>
              <div className="starrating">
                <StarRating average={getAverageRating(product?.id)} />
              </div>
              <p className="description">{product.description}</p>
              <p className="product-price">Price: ${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
