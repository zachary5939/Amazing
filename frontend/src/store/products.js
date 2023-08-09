import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { csrfFetch } from "./csrf";

// Action Types
const FETCH_PRODUCTS_SUCCESS = 'products/FETCH_PRODUCTS_SUCCESS';
const FETCH_PRODUCT_SUCCESS = 'products/FETCH_PRODUCT_SUCCESS';

// Action Creators
const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

const fetchProductSuccess = (product) => ({
  type: FETCH_PRODUCT_SUCCESS,
  payload: product,
});

// Thunks
export const fetchAllProducts = () => async (dispatch) => {
  try {
    const response = await csrfFetch('/api/products');
    const products = await response.json();
    dispatch(fetchProductsSuccess(products));
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

export const fetchProductById = (productId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/products/${productId}`);
    const product = await response.json();
    dispatch(fetchProductSuccess(product));
  } catch (error) {
    console.error(`Error fetching product with ID ${productId}:`, error);
  }
};

// Reducer
const initialState = {
  allProducts: [],
  productById: null,
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        allProducts: action.payload,
      };
    case FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        productById: action.payload,
      };
    default:
      return state;
  }
};

export default productsReducer;
