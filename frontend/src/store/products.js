import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { csrfFetch } from "./csrf";

// Action Types
const FETCH_ALL_PRODUCTS_SUCCESS = 'products/FETCH_PRODUCTS_SUCCESS';
const FETCH_PRODUCT_SUCCESS = 'products/FETCH_PRODUCT_SUCCESS';
const SEARCH_RESULTS = "products/SEARCH_RESULTS";
const CLEAR_RATINGS = 'ratings/CLEAR_RATINGS';
// Action Creators
const fetchProductsSuccess = (products) => ({
  type: FETCH_ALL_PRODUCTS_SUCCESS,
  payload: products,
});

const fetchProductSuccess = (product) => ({
  type: FETCH_PRODUCT_SUCCESS,
  payload: product,
});

export const setSearchResults = (results) => ({
  type: SEARCH_RESULTS,
  payload: results,
});

export const clearRatings = () => ({
  type: CLEAR_RATINGS,
});

export const searchProductsByName = (name) => async (dispatch) => {
  const response = await fetch(`/api/products/search?name=${name}`);

  if (response.ok) {
    const products = await response.json();
    dispatch(setSearchResults(products));
    return true;
  }
  return false;
};


export const fetchAllProducts = () => async (dispatch) => {
  try {
    const response = await csrfFetch('/api/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
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
    return product;
  } catch (error) {
    console.error(`Error fetching product with ID ${productId}:`, error);
  }
};

export const fetchProductsByCategory = (categoryId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/products/category/${categoryId}`);
    const products = await response.json();
    dispatch(fetchProductsSuccess(products));
  } catch (error) {
    console.error(`Error fetching products for category ${categoryId}:`, error);
  }
};

// Reducer
const initialState = {
  allProducts: {},
  productById: {},
  searched: false,
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        allProducts: action.payload,
      };
    case FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        productById: action.payload,
      };
      case SEARCH_RESULTS:
        const productsObj = action.payload.reduce((acc, product) => {
          acc[product.id] = product;
          return acc;
        }, {});
        return { ...state, allProducts: productsObj };
            case CLEAR_RATINGS:
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
};

export default productsReducer;
