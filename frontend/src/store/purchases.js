import { csrfFetch } from "./csrf";

// Action Types
const FETCH_PURCHASES = 'purchases/FETCH_PURCHASES';
const USER_PURCHASES = 'purchases/USER_PURCHASES';
const RESET_PURCHASES = 'purchases/RESET_PURCHASES';
const FINALIZE_PURCHASE = 'purchases/FINALIZE_PURCHASE';
const DELETE_PURCHASE = 'purchases/DELETE_PURCHASE';
const UPDATE_PURCHASE = 'purchases/UPDATE_PURCHASE';
const UPDATE_PURCHASE_QUANTITY = 'purchases/UPDATE_PURCHASE_QUANTITY';
const START_TIMER = 'purchases/START_TIMER';
const UPDATE_TIMER = 'purchases/UPDATE_TIMER';
const CLEAR_TIMER = 'purchases/CLEAR_TIMER';
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

export const deletePurchaseSuccess = (purchaseId) => ({
  type: DELETE_PURCHASE,
  payload: purchaseId,
});

export const updatePurchaseSuccess = (updatedPurchase) => ({
  type: UPDATE_PURCHASE,
  payload: updatedPurchase,
});

export const updatePurchaseQuantitySuccess = (id, quantity) => ({
  type: UPDATE_PURCHASE_QUANTITY,
  payload: { id, quantity },
});

export const startTimer = (timestamp) => ({
  type: START_TIMER,
  payload: timestamp,
});

export const updateTimer = () => ({
  type: UPDATE_TIMER,
});

export const clearTimer = () => ({
  type: CLEAR_TIMER,
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

export const deletePurchase = (purchaseId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/purchases/${purchaseId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      dispatch(deletePurchaseSuccess(purchaseId));
    } else {
      // Handle potential errors returned from the server
      const data = await response.json();
      console.error('Error deleting purchase:', data.message);
    }
  } catch (error) {
    console.error('Error deleting purchase:', error);
  }
};

export const updatePurchaseQuantity = (purchaseId, newQuantity) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/purchases/${purchaseId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity: newQuantity }),
    });

    if (response.ok) {
      const updatedPurchase = await response.json();
      dispatch(updatePurchaseQuantitySuccess(updatedPurchase));
    } else {
      const data = await response.json();
      console.error('Error updating purchase quantity:', data.message);
    }
  } catch (error) {
    console.error('Error updating purchase quantity:', error);
  }
};

// Reducer
const initialState = {
  items: [],
  lastUpdated: null,
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
    case DELETE_PURCHASE:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    case UPDATE_PURCHASE_QUANTITY:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
        ),
      };
    // Timer Reducer Logic
    case START_TIMER:
      return {
        ...state,
        lastUpdated: action.payload,
      };
    case UPDATE_TIMER:
      return {
        ...state,
      };
    case CLEAR_TIMER:
      return {
        ...state,
        lastUpdated: null,
      };
    default:
      return state;
  }
};

export default purchasesReducer;
