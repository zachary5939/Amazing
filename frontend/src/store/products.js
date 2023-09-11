import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { csrfFetch } from "./csrf";

// Action Types
const FETCH_ALL_PRODUCTS_SUCCESS = "products/FETCH_PRODUCTS_SUCCESS";
const FETCH_PRODUCT_SUCCESS = "products/FETCH_PRODUCT_SUCCESS";
const SEARCH_RESULTS = "products/SEARCH_RESULTS";
const CLEAR_RATINGS = "ratings/CLEAR_RATINGS";
const RESET_SEARCH_STATE = "products/RESET_SEARCH_STATE";
const UPDATE_PRODUCT_SUCCESS = "products/UPDATE_PRODUCT_SUCCESS";
const NO_PRODUCTS_FOUND = "products/NO_PRODUCTS_FOUND";
// Action Creators
export const resetSearchState = () => ({
  type: RESET_SEARCH_STATE,
});

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

export const updateProductSuccess = (product) => ({
  type: UPDATE_PRODUCT_SUCCESS,
  payload: product,
});

export const noProductsFound = () => ({
  type: 'NO_PRODUCTS_FOUND'
});

export const searchProductsByName = (name) => async (dispatch) => {
  const response = await fetch(`/api/products/search?name=${name}`);

  if (response.status === 404) {
    dispatch(noProductsFound());
    return false;
  }

  if (response.ok) {
    const products = await response.json();
    if (products.error || products.length === 0) {
      dispatch(noProductsFound());
    } else {
      dispatch(setSearchResults(products));
    }
    return true;
  }
  return false;
};



export const fetchAllProducts = () => async (dispatch) => {
  try {
    const response = await csrfFetch("/api/products");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const products = await response.json();
    dispatch(fetchProductsSuccess(products));
  } catch (error) {
    console.error("Error fetching products:", error);
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

export const updateProduct = (productData) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/products/${productData.id}`, {
      method: "PUT",
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error("Failed to update product");
    }

    const updatedProduct = await response.json();
    dispatch(updateProductSuccess(updatedProduct));
    return updatedProduct;
  } catch (error) {
    console.error("Error updating product:", error);
  }
};

// Reducer
const initialState = {
  allProducts: {},
  productById: {},
  searchedProducts: {},
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
      const searchedProductsObj = action.payload.reduce((acc, product) => {
        acc[product.id] = product;
        return acc;
      }, {});
      return {
        ...state,
        searchedProducts: searchedProductsObj,
        searched: true,
      };
    case CLEAR_RATINGS:
      return {
        ...state,
        items: [],
      };
    case RESET_SEARCH_STATE:
      return {
        ...state,
        searchedProducts: {},
        searched: false,
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        allProducts: {
          ...state.allProducts,
          [action.payload.id]: action.payload,
        },
        productById:
          action.payload.id === state.productById.id
            ? action.payload
            : state.productById,
      };
    case NO_PRODUCTS_FOUND:
      return {
        ...state,
        searchedProducts: {},
        searched: false,
      };
    default:
      return state;
  }
};

export default productsReducer;
