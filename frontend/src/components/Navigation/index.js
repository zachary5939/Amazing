import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import logo from "../../img/amazinglogo.png";
import * as sessionActions from '../../store/session';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

let sessionLinks;
if (sessionUser) {
  sessionLinks = (
    <li>
      <ProfileButton user={sessionUser} />
    </li>
  );
} else {
  sessionLinks = (
    <li className="login-item">
      <NavLink to="/login">Log In</NavLink>
    </li>
  );
}

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li>
          <div className='logo-container'></div>
          <NavLink exact to="/">
            <img src={logo} alt="Amazing Logo" className="logo-image" />
          </NavLink>
        </li>
        <li>
          <input type="text" placeholder="Search..." className="search-bar" />
        </li>
        {isLoaded && sessionLinks}
      </ul>
    </nav>
  );
}

export default Navigation;
