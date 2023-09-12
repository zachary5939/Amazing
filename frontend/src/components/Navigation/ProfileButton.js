import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const containerRef = useRef();
  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  const openMenu = () => {
    setShowMenu((prev) => !prev);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/");
  };

  const viewWishlist = () => {
    history.push("/wishlist");
  };

  const viewReviews = () => {
    history.push("/reviews");
  };

  const viewPurchases = () => {
    history.push("/purchases");
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
        <div className="user-details">
          <li className="username-info">
            Hi, {user.firstName} {user.lastName}!
          </li>
        </div>
        <div className="actions">
          <li>
            <button onClick={viewPurchases}>Orders</button>
          </li>
          <li>
            <button onClick={viewReviews}>Reviews</button>
          </li>
          <li>
            <button onClick={viewWishlist}>Wishlist</button>
          </li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </div>
      </ul>
    </div>
  );
}

export default ProfileButton;
