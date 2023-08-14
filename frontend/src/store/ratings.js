import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { csrfFetch } from "./csrf";

// Action Types
const FETCH_RATINGS = 'ratings/FETCH_RATINGS';
const ADD_RATING = 'ratings/ADD_RATING';
const UPDATE_RATING = 'ratings/UPDATE_RATING';
const REMOVE_RATING = 'ratings/REMOVE_RATING';

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

export const fetchRatings = (productId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/products/${productId}/ratings`);
    const ratingData = await response.json();
    dispatch(fetchRatingsSuccess(ratingData));
  } catch (error) {
    console.error('Error fetching ratings:', error);
  }
};

export const addRating = (userId, productId, rating, text) => async (dispatch) => {
  try {
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

// Reducer
const initialState = {
  items: [],
};

const ratingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RATINGS:
      return {
        ...state,
        items: action.payload,
      };
    case ADD_RATING:
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
