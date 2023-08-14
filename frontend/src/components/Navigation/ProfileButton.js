import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const containerRef = useRef();
  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  const openMenu = () => {
    setShowMenu(prev => !prev);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/");
  };

  const viewOrders = () => {
    history.push("/orders");
  };

  const viewReviews = () => {
    history.push("/reviews");
  };

  const comingSoon = () => {
    alert("Coming soon!");
  };

  return (
    <div className="profile-container" ref={containerRef}>
      <div className="profile-trigger" onClick={openMenu}>
        <div className="profile-text">
          <p>Hello, {user.firstName}</p>
          <p>Account & Lists</p>
        </div>
      </div>
      <ul className={ulClassName} ref={ulRef}>
        <li>{user.username}</li>
        <li>{user.firstName} {user.lastName}</li>
        <li>{user.email}</li>
        <li>
          <button onClick={comingSoon}>View orders</button>
        </li>
        <li>
          <button onClick={viewReviews}>View reviews</button>
        </li>
        <li>
          <button onClick={logout}>Log Out</button>
        </li>
      </ul>
    </div>
  );
}

export default ProfileButton;
