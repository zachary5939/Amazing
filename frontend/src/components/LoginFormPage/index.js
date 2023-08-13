// frontend/src/components/LoginFormModal/index.js

import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { login } from "../../store/session";
import { useHistory } from "react-router-dom";
import logo from "../../img/amazinglogoblack.png";
import "./LoginForm.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const history = useHistory();

  const handleDemoUserClick = () => {
    const demoCredential = "demo@user.io";
    const demoPassword = "password";

    dispatch(sessionActions.login({ credential: demoCredential, password: demoPassword }))
      .then(() => {
        closeModal();
        history.push("/");
      })
      .catch((res) => {
        if (res.data && res.data.errors) {
          setErrors(res.data.errors);
        } else {
          setErrors({ credential: "Invalid credentials. Please try again." });
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    dispatch(login({ credential, password }))
      .then(() => {
        closeModal();
        history.push("/");
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          setErrors({ credential: "Invalid credentials. Please try again." });
        }
      });
  };

  return (
    <div className="login-container-main">
      <div className="login-logo-container">
        <img src={logo} alt="Amazing Logo" className="login-logo-image" />
      </div>
      <div className="login-content-container">
        <h1>Sign In</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            Username or Email
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
          {errors.credential && <p className="login-error-message">{errors.credential}</p>}
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.password && <p className="login-error-message">{errors.password}</p>}
          <button type="submit">Log In</button>
          <button type="button" onClick={handleDemoUserClick}>Demo User</button>
        </form>
      </div>
      <div className="login-new">
      </div>
    </div>
  );
}

export default LoginFormPage;
