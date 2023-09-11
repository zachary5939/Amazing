import * as productActions from "../../store/products";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import prime from "../../img/prime.png";
import { fetchRatingsForProducts } from "../../store/ratings";
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
  const [sortOption, setSortOption] = useState("");
  const [forceUpdate, setForceUpdate] = useState(0);

  const searchedProducts = useSelector(
    (state) => state.products.searchedProducts
  );

  useEffect(() => {
    if (categoryId) {
      dispatch(productActions.fetchProductsByCategory(categoryId));
    } else {
      dispatch(productActions.resetSearchState()); // Always reset the search state
      dispatch(productActions.fetchAllProducts());
    }
}, [dispatch, categoryId]);


  useEffect(() => {
    setForceUpdate(prev => prev + 1);
  }, [categoryId]);

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

  const sortedProducts = () => {
    switch (sortOption) {
      case "alphabetical":
        return [...displayProducts].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      case "priceHighToLow":
        return [...displayProducts].sort((a, b) => b.price - a.price);
      case "priceLowToHigh":
        return [...displayProducts].sort((a, b) => a.price - b.price);
      case "topRated":
        return [...displayProducts].sort(
          (a, b) => getAverageRating(b.id) - getAverageRating(a.id)
        );
      default:
        return displayProducts;
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
    <div className="main-content">
      <div className="content-area">
    <div>
      <h2 className="category-name">{getCategoryName(categoryId)}</h2>
      <div className="sorting-container">
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="alphabetical">Alphabetical</option>
          <option value="priceHighToLow">Price: High to Low</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="topRated">Top Rated</option>
        </select>
      </div>
      <div className="products-container">
            {sortedProducts().map((product) => (
              <div key={product.id} className="product-item">
                <Link to={`/products/${product.id}`}>
                  <div className="image-container">
                    <img src={product?.imageUrl} alt={product?.name} />
                  </div>
                </Link>
                <div className="product-details">
                  <h3 className="product-name">
                    <Link to={`/products/${product.id}`}>{product.name}</Link>
                  </h3>
                  <div className="starrating">
                    <StarRating average={getAverageRating(product?.id)} />
                  </div>
                  <div className="price-and-delivery">
                    <p className="product-price">${product?.price}</p>
                    <div className="product-info-right">
                      <img src={prime} alt="prime" className="prime-logo" />
                      <p>
                        FREE delivery by Amazing
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
