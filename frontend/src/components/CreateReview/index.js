import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRating } from '../../store/ratings';

function ReviewForm({ product }) {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');

  const userId = useSelector((state) => state.session.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addRating(userId, product.id, rating, text));
};


  return (
    <div>
      <h2>Review for {product?.name}</h2>
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
