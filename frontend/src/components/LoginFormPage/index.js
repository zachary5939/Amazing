import React, { useState } from "react";
import * as sessionActions from "../../store/session";
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

  const signUp = () => {
    history.push("/signup");
  };

  const handleDemoUserClick = () => {
    const demoCredential = "demo@user.io";
    const demoPassword = "password";

    dispatch(
      sessionActions.login({
        credential: demoCredential,
        password: demoPassword,
      })
    )
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
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          setErrors(error.response.data.errors);
        } else {
          setErrors({ credential: "Invalid credentials. Please try again." });
        }
      });
  };

  return (
    <div className="login-form-page">
      <div className="login-form-page__logo-container">
        <img
          src={logo}
          alt="Amazing Logo"
          className="login-form-page__logo-image"
        />
      </div>
      <div className="login-form-page__content-container">
        <h1>Sign In</h1>
        {errors.credential && (
          <p className="login-form__error-message">{errors.credential}</p>
        )}
        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-form__label">
            Username or Email
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              className="login-form__input"
              required
            />
          </label>
          {errors.credential && (
            <p className="login-form__error-message">{errors.credential}</p>
          )}
          <label className="login-form__label">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-form__input"
              required
            />
          </label>
          {errors.password && (
            <p className="login-form__error-message">{errors.password}</p>
          )}
          <button type="submit" className="login-form__button">
            Log In
          </button>
          <button
            type="button"
            onClick={handleDemoUserClick}
            className="login-form__button"
          >
            Demo User
          </button>
        </form>
      </div>
      <div className="login-form-page__new-user">
        <h4>New to Amazing?</h4>
        <button
          type="submit"
          onClick={signUp}
          className="login-form-page__new-user-button"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default LoginFormPage;
