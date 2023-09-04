import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMagnifyingGlass,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import ProfileButton from "./ProfileButton";
import logo from "../../img/amazinglogo.png";
import * as sessionActions from "../../store/session";
import { searchProductsByName } from "../../store/products";
import "./Navigation.css";
library.add(faMagnifyingGlass, faCartShopping);

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState("");

  const comingSoon = () => {
    alert("Coming soon!");
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      dispatch(searchProductsByName(searchTerm))
      .then(success => {
        if (success) {
          history.push('/search');
        }
      });
    }
  };



  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = <NavLink to="/login">Sign in</NavLink>;
  }

  return (
    <>
      <nav className="nav-bar">
        <ul className="nav-list">
          <li>
            <NavLink exact to="/">
              <img src={logo} alt="Amazing Logo" className="logo-image" />
            </NavLink>
          </li>
          <li className="nav-search-container">
            <input
              type="text"
              placeholder="Search..."
              className="nav-search-bar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            <button onClick={handleSearch} className="nav-search-button">
              <FontAwesomeIcon icon={["fa-solid", "fa-magnifying-glass"]} />
            </button>
          </li>
          {isLoaded && <li className="nav-login-item">{sessionLinks}</li>}

          <li>
            <NavLink to="/cart">
              <i className="fa-solid fa-cart-shopping"></i>
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="nav-categories-container">
        <NavLink to="/products">All Products</NavLink>
        <NavLink to="/products/category/1">Electronics</NavLink>
        <NavLink to="/products/category/2">Entertainment</NavLink>
        <NavLink to="/products/category/3">Home Goods</NavLink>
        <NavLink to="/products/category/4">Grocery</NavLink>
      </div>
    </>
  );
}
export default Navigation;
