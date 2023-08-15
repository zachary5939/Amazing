import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import LandingPage from "./components/LandingPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ProductPage from "./components/ProductPage";
import Cart from "./components/Cart";
import Reviews from "./components/Reviews";
import CreateReview from "./components/CreateReview";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
        <Route exact path="/products">
          <Products />
        </Route>
        <Route exact path="/products/category/:categoryId">
          <Products />
        </Route>
        <Route exact path="/products/:productId">
          <ProductPage />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route exact path="/reviews">
          <Reviews />
        </Route>
        <Route path="/newreview">
          <CreateReview />
        </Route>
        <Redirect to="/" />
      </Switch>
    </>
  );
}

export default App;
