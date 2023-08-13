import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import ProfileButton from './ProfileButton';
import logo from "../../img/amazinglogo.png";
import * as sessionActions from '../../store/session';
import { searchProductsByName } from "../../store/products";
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState("");

  const comingSoon = () => {
    alert("Coming soon!");
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      dispatch(searchProductsByName(searchTerm, history));
    }
  };

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <li className="login-item">
        <NavLink to="/login">Hello, sign in</NavLink>
      </li>
    );
  }

  return (
    <>
      <nav className="navbar">
        <ul className="nav-list">
          <li>
            <NavLink exact to="/">
              <img src={logo} alt="Amazing Logo" className="logo-image" />
            </NavLink>
          </li>
          <li className="search-container">
            <input
              type="text"
              placeholder="Search coming soon..."
              className="search-bar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            <button onClick={comingSoon} className="search-button">Search</button>
          </li>
          {isLoaded && <li>{sessionLinks}</li>}
          <li>
            <NavLink to="/cart">
              <i className="fa-solid fa-cart-shopping"></i>
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="categories-container">
        <NavLink to="/products">All products</NavLink>
        <NavLink to="/products/category/1">Electronics</NavLink>
        <NavLink to="/products/category/2">Entertainment</NavLink>
        <NavLink to="/products/category/3">Home</NavLink>
        <NavLink to="/products/category/4">Grocery</NavLink>
      </div>
    </>
  );
}
export default Navigation;
