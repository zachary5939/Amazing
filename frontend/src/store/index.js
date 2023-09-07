import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import productsReducer from "./products";
import cartReducer from "./cart";
import ratingsReducer from "./ratings";
import purchasesReducer from "./purchases";
import wishlistsReducer from "./wishlist";


const rootReducer = combineReducers({
  session: sessionReducer,
  products: productsReducer,
  cart: cartReducer,
  ratings: ratingsReducer,
  purchases: purchasesReducer,
  wishlist: wishlistsReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
