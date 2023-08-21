import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { csrfFetch } from "./csrf";

// Action Types
const FETCH_CART_ITEMS_SUCCESS = 'cart/FETCH_CART_ITEMS_SUCCESS';
const ADD_TO_CART_SUCCESS = 'cart/ADD_TO_CART_SUCCESS';
const UPDATE_CART_ITEM_SUCCESS = 'cart/UPDATE_CART_ITEM_SUCCESS';
const REMOVE_FROM_CART_SUCCESS = 'cart/REMOVE_FROM_CART_SUCCESS';
const CLEAR_CART = 'cart/CLEAR_CART';

// Action Creators
export const fetchCartItemsSuccess = (cartItems) => ({
  type: FETCH_CART_ITEMS_SUCCESS,
  payload: cartItems,
});

export const addToCartSuccess = (cartItem) => ({
  type: ADD_TO_CART_SUCCESS,
  payload: cartItem,
});

export const updateCartItemSuccess = (cartItem) => ({
  type: UPDATE_CART_ITEM_SUCCESS,
  payload: cartItem,
});

export const removeFromCartSuccess = (cartItemId) => ({
  type: REMOVE_FROM_CART_SUCCESS,
  payload: cartItemId,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});

export const fetchCartItems = (userId) => async (dispatch) => {
  if (!userId) {
    console.error('UserId is missing for fetching cart items');
    return;
}
  try {
    const response = await csrfFetch(`/api/cart?userId=${userId}`);
    const cartData = await response.json();
    dispatch(fetchCartItemsSuccess(cartData));
  } catch (error) {
    console.error('Error fetching cart items:', error);
  }
};


export const addToCart = (userId, productId, quantity) => async (dispatch) => {
  try {
    const response = await csrfFetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, productId, quantity }),
    });

    if (!response.ok) {
      throw new Error('Failed to add to cart');
    }

    const cartItem = await response.json();

    dispatch(addToCartSuccess(cartItem));
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
};

export const removeFromCart = (cartItemId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/cart/${cartItemId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to remove from cart');
    }

    dispatch(removeFromCartSuccess(cartItemId));
  } catch (error) {
    console.error('Error removing from cart:', error);
  }
};

export const updateCartItemQuantity = (cartItemId, quantity) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/cart/${cartItemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity }),
    });

    if (!response.ok) {
      throw new Error('Failed to update cart item quantity');
    }

    const updatedCartItem = await response.json();
    dispatch(updateCartItemSuccess(updatedCartItem));
    console.log('updatedCartItem', updatedCartItem);
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
  }
};

export const clearUserCart = (userId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/cart/user/${userId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to clear the cart for the user');
    }

    dispatch(clearCart());
  } catch (error) {
    console.error('Error clearing the cart for the user:', error);
  }
};


// Reducer
const initialState = {
  items: [],
};


const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CART_ITEMS_SUCCESS:
      return {
        ...state,
        items: action.payload,
      };
    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
      case UPDATE_CART_ITEM_SUCCESS: {
        const updatedCartItem = action.payload;
        const updatedItems = state.items.map((item) =>
          item.id === updatedCartItem.id ? updatedCartItem : item
        );
        return {
          ...state,
          items: updatedItems,
        };
      }

    case REMOVE_FROM_CART_SUCCESS:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
      case CLEAR_CART:
        return {
          ...state,
          items: [],
        };
    default:
      return state;
  }
};

export default cartReducer;
