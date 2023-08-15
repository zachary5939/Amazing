import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRating } from "../../store/ratings";
import { useParams, useHistory } from "react-router-dom";
import { fetchProductById } from "../../store/products";

function ReviewForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { productId } = useParams();
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const product = useSelector((state) => state.products.productById);

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  const user = useSelector((state) => state.session.user);
  const userId = user?.id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addRating(userId, product.id, rating, text));
    // console.log('Submitting review with userId:', userId);
    history.push(`/products/${product.id}`);
  };


  return (
    <div>
      <h2>Review for {product?.name}</h2>
      <img src={product?.imageUrl} alt={product?.name} />

      <form onSubmit={handleSubmit}>
        <div>
          {[...Array(5).keys()].map((index) => (
            <label key={index}>
              <input
                type="radio"
                value={index + 1}
                checked={rating === index + 1}
                onChange={() => setRating(index + 1)}
              />
              {index + 1}
            </label>
          ))}
        </div>
        <div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your review here..."
          />
        </div>
        <div>
          <button type="submit">Submit Review</button>
        </div>
      </form>
    </div>
  );
}

export default ReviewForm;
