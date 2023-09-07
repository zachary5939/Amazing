import { csrfFetch } from "./csrf";
//Types
const FETCH_WISHLISTS = 'wishlists/FETCH_WISHLISTS';
const USER_WISHLISTS = 'wishlists/USER_WISHLISTS';
const RESET_WISHLISTS = 'wishlists/RESET_WISHLISTS';
const ADD_TO_WISHLIST = 'wishlists/ADD_TO_WISHLIST';
const DELETE_FROM_WISHLIST = 'wishlists/DELETE_FROM_WISHLIST';

// Action Creators
export const fetchWishlistsSuccess = (wishlists) => ({
    type: FETCH_WISHLISTS,
    payload: wishlists,
  });

  export const userWishlistsSuccess = (wishlists) => ({
    type: USER_WISHLISTS,
    payload: wishlists,
  });

  export const addToWishlistSuccess = (wishlistItem) => ({
    type: ADD_TO_WISHLIST,
    payload: wishlistItem,
  });

  export const resetWishlists = () => ({
    type: RESET_WISHLISTS,
  });

  export const deleteFromWishlistSuccess = (productId) => ({
    type: DELETE_FROM_WISHLIST,
    payload: productId,
  });

  //thunks
  export const fetchUserWishlists = (userId) => async (dispatch) => {
    try {
      const response = await csrfFetch(`/api/wishlists?userId=${userId}`);
      if (response.ok) {
        const wishlistsData = await response.json();
        dispatch(userWishlistsSuccess(wishlistsData));
      } else {
        dispatch(resetWishlists());
      }
    } catch (error) {
      console.error('Error fetching user wishlists:', error);
      dispatch(resetWishlists());
    }
  };

  export const deleteFromWishlist = (userId, productId) => async (dispatch) => {
    try {
      const response = await csrfFetch(`/api/wishlists?userId=${userId}&productId=${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        dispatch(deleteFromWishlistSuccess(productId));
      } else {
        const data = await response.json();
        console.error('Error deleting wishlist item:', data.message);
      }
    } catch (error) {
      console.error('Error deleting wishlist item:', error);
    }
  };

  //init reducer
  const initialState = {
    items: [],
  };

  //reducer

  const wishlistsReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_WISHLISTS:
        return {
          ...state,
          items: action.payload,
        };
      case USER_WISHLISTS:
        return {
          ...state,
          items: action.payload,
        };
      case RESET_WISHLISTS:
        return initialState;
      case ADD_TO_WISHLIST:
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      case DELETE_FROM_WISHLIST:
        return {
          ...state,
          items: state.items.filter(item => item.productId !== action.payload),
        };
      default:
        return state;
    }
  };

  export default wishlistsReducer;
