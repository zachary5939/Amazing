import { csrfFetch } from "./csrf";

// Action Types
const FETCH_PURCHASES = 'purchases/FETCH_PURCHASES';
const USER_PURCHASES = 'purchases/USER_PURCHASES';
const RESET_PURCHASES = 'purchases/RESET_PURCHASES';
const FINALIZE_PURCHASE = 'purchases/FINALIZE_PURCHASE';

// Action Creators
export const fetchPurchasesSuccess = (purchases) => ({
  type: FETCH_PURCHASES,
  payload: purchases,
});

export const userPurchasesSuccess = (purchases) => ({
  type: USER_PURCHASES,
  payload: purchases,
});

export const finalizePurchaseSuccess = (purchases) => ({
  type: FINALIZE_PURCHASE,
  payload: purchases,
});


export const resetPurchases = (purchases) => ({
  type: RESET_PURCHASES,
  payload: purchases,
});

export const fetchUserPurchases = (userId) => async (dispatch) => {
  if (!userId) {
    console.error('User ID not provided.');
    return;
  }

  try {
    const response = await csrfFetch(`/api/purchases?userId=${userId}`);

    if (response.status === 404) {
      dispatch(resetPurchases());
      return;
    }

    const purchaseData = await response.json();
    dispatch(userPurchasesSuccess(purchaseData));
  } catch (error) {
    console.error('Error fetching user purchases:', error);
    dispatch(resetPurchases());
  }
};

export const finalizePurchase = (userId) => async (dispatch) => {
  try {
    console.log("Sending userId:", userId);  // just for debugging, it should print a number now.

    const response = await csrfFetch('/api/purchases/finalize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    if (response.ok) {
      dispatch(finalizePurchaseSuccess());
      // Reset the purchases or perform additional steps
    }
  } catch (error) {
    console.error('Error finalizing purchase:', error);
  }
};



// Reducer
const initialState = {
  items: [],
};

const purchasesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PURCHASES:
      return {
        ...state,
        items: action.payload,
      };
    case USER_PURCHASES:
      return {
        ...state,
        items: action.payload,
      };
    case RESET_PURCHASES:
      return {
        ...state,
        items: [],
      };
    case FINALIZE_PURCHASE:
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
};

export default purchasesReducer;
