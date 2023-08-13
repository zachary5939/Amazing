import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const containerRef = useRef(); // Ref for the entire container

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

  const comingSoon = () => {
    alert("Coming soon!");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className="account-info" ref={containerRef}>
      <div className="open-menu-text" onClick={openMenu}>
        <div className="text-decorating">
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
          <button onClick={logout}>Log Out</button>
        </li>
      </ul>
    </div>
  );
}

export default ProfileButton;
