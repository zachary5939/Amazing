import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { useLocation } from 'react-router-dom';
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
import Footer from "./components/Footer";
import CompletePurchase from "./components/CompletePurchase";
import NotFound from "./components/NotFound";
import Search from "./components/Search";
import Purchases from './components/Purchases';
import Wishlist from "./components/Wishlist";
import { logPageView } from './utils/analytics';


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    logPageView(); // Log the initial page view
  }, [dispatch]);

  useEffect(() => {
    logPageView(); // Log subsequent page views when the route changes
  }, [location]);


  const location = useLocation();
  const searchTerm = new URLSearchParams(location.search).get('term');


  return (
    <div className="app-container">
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
          <Route exact path="/purchases">
            <Purchases />
        </Route>
        <Route exact path="/wishlist">
          <Wishlist />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route exact path="/complete">
          <CompletePurchase />
        </Route>
        <Route exact path="/reviews">
          <Reviews />
        </Route>
        <Route path="/newreview/:productId">
          <CreateReview />
        </Route>
        <Route path="/search" render={(props) => <Search {...props} key={searchTerm} />} />
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
