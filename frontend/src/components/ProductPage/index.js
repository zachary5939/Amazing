import "./ProductPage.css";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import { fetchProductById } from "../../store/products";
import { fetchCartItems, addToCart } from "../../store/cart";
import { fetchRatings } from "../../store/ratings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";

function ProductPage() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.productById);
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const user = useSelector((state) => state.session.user);
  const history = useHistory();
  const cartItems = useSelector((state) => state.cart.items);
  const ratings = useSelector((state) => state.ratings.items);

  useEffect(() => {
    dispatch(fetchProductById(productId));
    dispatch(fetchRatings(productId));
    if (user) {
      dispatch(fetchCartItems(user.id));
    }
  }, [dispatch, productId, user]);

  //The useMemo hook only runs when one of its dependencies update.
  //https://legacy.reactjs.org/docs/hooks-reference.html#usememo

  const productQuantityInCart = useMemo(() => {
    return (
      cartItems.find((item) => item.productId === parseInt(productId))
        ?.quantity || 0
    );
  }, [cartItems, productId]);

  const isProductSoldOut = useMemo(() => {
    return productQuantityInCart >= 10;
  }, [productQuantityInCart]);

  const maxQuantityToAdd = useMemo(() => {
    return 10 - productQuantityInCart;
  }, [productQuantityInCart]);

  const averageRating = useMemo(() => {
    if (!ratings || !ratings.length) return null;
    const total = ratings.reduce((acc, curr) => acc + curr.rating, 0);
    return (total / ratings.length).toFixed(2);
  }, [ratings]);

  const handleAddToCart = async () => {
    try {
      await dispatch(addToCart(user.id, product.id, quantity));
      alert("Successfully added to cart");
      dispatch(fetchCartItems(user.id));
    } catch (error) {
      alert("Failed to add to cart");
    }
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);
  };

  const notLoggedIn = () => {
    history.push("/login");
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const totalPrice = (product.price * quantity).toFixed(2);

  const fullStars = Math.floor(averageRating);
  const halfStars = averageRating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  return (
    <div className="product-page">
      <div className="product-page__top-section">
        <div className="product-page__image-container">
          <img src={product?.imageUrl} alt={product.name} />
        </div>

        <div className="product-page__center">
          <h2>{product?.name}</h2>

          <div>
            {[...Array(fullStars)].map((_, index) => (
              <FontAwesomeIcon className="star" icon={faStar} key={index} />
            ))}
            {[...Array(halfStars)].map((_, index) => (
              <FontAwesomeIcon
                className="star"
                icon={faStarHalfAlt}
                key={index}
              />
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

          <p>{product?.description}</p>
          <p>MSRP: ${product?.price}</p>
        </div>

        <div className="product-page__right">
          <p>Total Price: ${totalPrice}</p>
          <p>{isProductSoldOut ? "Sold Out" : "In Stock"}</p>
          <div>
            <label htmlFor="quantity">Quantity:</label>
            <select
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
            >
              {[...Array(maxQuantityToAdd).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
          </div>
          {user ? (
            isProductSoldOut ? (
              <button disabled>Limit 10 Per person</button>
            ) : (
              <button onClick={handleAddToCart}>Add to Cart</button>
            )
          ) : (
            <button onClick={notLoggedIn}>Please login to purchase</button>
          )}
        </div>
      </div>

      <div className="product-reviews-container">
    <h2>Reviews</h2>
    {ratings && ratings.length ? (
        ratings.map((rating) => (
            <div key={rating.id} className="product-review">
                {rating?.user?.username ? (
                    <p>
                        <strong>Reviewer:</strong> {rating.user.username}
                    </p>
                ) : null}
                <p>
                    <strong>Rating:</strong> {rating?.rating} / 5
                </p>
                <p>
                    <strong>Review:</strong> {rating?.text}
                </p>
            </div>
        ))
    ) : (
        <p>No reviews available for this product.</p>
    )}
</div>

    </div>
  );
}

export default ProductPage;
