import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { csrfFetch } from "./csrf";

// Action Types
const ADD_TO_CART = 'cart/ADD_TO_CART';
const UPDATE_CART_ITEM = 'cart/UPDATE_CART_ITEM';
const REMOVE_FROM_CART = 'cart/REMOVE_FROM_CART';

// Action Creators
export const addToCart = (productId, quantity) => ({
  type: ADD_TO_CART,
  payload: { productId, quantity },
});

export const updateCartItem = (productId, quantity) => ({
  type: UPDATE_CART_ITEM,
  payload: { productId, quantity },
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

export const addToCartAsync = (productId, quantity) => async (dispatch) => {
};

// Reducer
const initialState = {
  items: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        items: [...state.items, { productId: action.payload.productId, quantity: action.payload.quantity }],
      };
    case UPDATE_CART_ITEM:
      return {
        ...state,
        items: state.items.map((item) =>
          item.productId === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter((item) => item.productId !== action.payload),
      };
    default:
      return state;
  }
};

export default cartReducer;
