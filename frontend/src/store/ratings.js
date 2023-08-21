import { fetchProductById } from "./products"
import { csrfFetch } from "./csrf";

// Action Types
const FETCH_RATINGS = 'ratings/FETCH_RATINGS';
const ADD_RATING = 'ratings/ADD_RATING';
const UPDATE_RATING = 'ratings/UPDATE_RATING';
const REMOVE_RATING = 'ratings/REMOVE_RATING';
const USER_RATINGS = 'ratings/USER_RATINGS';

// Action Creators
export const fetchRatingsSuccess = (ratings) => ({
  type: FETCH_RATINGS,
  payload: ratings,
});

export const addRatingSuccess = (rating) => ({
  type: ADD_RATING,
  payload: rating,
});

export const updateRatingSuccess = (rating) => ({
  type: UPDATE_RATING,
  payload: rating,
});

export const removeRatingSuccess = (ratingId) => ({
  type: REMOVE_RATING,
  payload: ratingId,
});

export const userRatingsSuccess = (ratings) => ({
  type: USER_RATINGS,
  payload: ratings,
});


export const fetchRatings = (productId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/ratings/product/${productId}`);
    const ratingsData = await response.json();
    dispatch({
      type: FETCH_RATINGS,
      payload: { ratings: ratingsData, productId }
    });
  } catch (error) {
    console.error('Error fetching ratings:', error);
  }
};


export const fetchAllRatings = () => async (dispatch) => {
  try {
    const response = await csrfFetch('/api/ratings');
    const ratingData = await response.json();
    dispatch(fetchRatingsSuccess(ratingData));
  } catch (error) {
    console.error('Error fetching all ratings:', error);
  }
};

export const fetchRatingsForProducts = (productIds) => async (dispatch) => {
  try {
    const responses = await Promise.all(productIds.map(productId => csrfFetch(`/api/ratings/product/${productId}`)));
    const allRatingsData = await Promise.all(responses.map(response => response.json()));
    const ratings = [].concat(...allRatingsData);

    dispatch({
      type: FETCH_RATINGS,
      payload: { ratings }
    });
  } catch (error) {
    console.error('Error fetching ratings:', error);
  }
};



export const addRating = (userId, productId, rating, text) => async (dispatch) => {
  let product;
  try {
    product = await dispatch(fetchProductById(productId));
    if (!product) {
      console.error('Failed to retrieve product for review.');
      return null;
    }

    const response = await csrfFetch('/api/ratings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, productId, rating, text }),
    });

    if (!response.ok) {
      throw new Error('Failed to add rating');
    }

    const newRating = await response.json();
    dispatch(addRatingSuccess(newRating));
    dispatch(fetchRatings(productId));

    return product;
  } catch (error) {
    console.error('Error adding rating:', error);
  }
};


export const updateRating = (ratingId, rating, text) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/ratings/${ratingId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rating, text }),
    });

    if (!response.ok) {
      throw new Error('Failed to update rating');
    }

    const updatedRating = await response.json();
    dispatch(updateRatingSuccess(updatedRating));
  } catch (error) {
    console.error('Error updating rating:', error);
  }
};

export const removeRating = (ratingId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/ratings/${ratingId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to remove rating');
    }

    dispatch(removeRatingSuccess(ratingId));
  } catch (error) {
    console.error('Error removing rating:', error);
  }
};

export const fetchUserRatings = (userId) => async (dispatch) => {
  if (!userId) {
    console.error('User ID not provided.');
    return;
  }

  try {
    const response = await csrfFetch(`/api/ratings/user/${userId}`);
    const ratingData = await response.json();
    dispatch(userRatingsSuccess(ratingData));
  } catch (error) {
    console.error('Error fetching user ratings:', error);
  }
};

// Reducer
const initialState = {
  items: [],
  productRatings: {},
};

const ratingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RATINGS: {
      return {
          ...state,
          items: action.payload.ratings,
      };
    }
      case USER_RATINGS:
        return {
          ...state,
          items: action.payload,
        };
        case ADD_RATING:
          console.log("Current items:", state.items);
          console.log("Payload:", action.payload);
          return {
            ...state,
            items: [...state.items, action.payload],
          };
      case UPDATE_RATING: {
        const updatedRating = action.payload;
        const updatedRatings = state.items.map((item) =>
          item.id === updatedRating.id ? updatedRating : item
        );
        return {
          ...state,
          items: updatedRatings,
        };
      }
    case REMOVE_RATING:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
        };
    default:
      return state;
  }
};

export default ratingsReducer;
