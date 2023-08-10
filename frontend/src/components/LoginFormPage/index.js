// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { login } from "../../store/session";
import logo from "../../img/amazinglogoblack.png";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const history = useHistory();


  const handleDemoUserClick = () => {
    const demoCredential = "demo@user.io";
    const demoPassword = "password";

    dispatch(login({ credential: demoCredential, password: demoPassword }))
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
    dispatch(sessionActions.login({ credential, password }))
      .then(() => {
        closeModal();
        history.push("/");
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };


  return (
    <div className="container">
    <>
    <div className="logo-container">
    <img src={logo} alt="Amazing Logo" className="logo-image" />
    </div>
    <div className="login-container">
      <h1>Sign In</h1>
      <form className="login-credentials" onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && <p>{errors.credential}</p>}
        <button type="submit">Log In</button>
        <button type="button"onClick={handleDemoUserClick} >Demo User</button>
      </form>
      </div>
      <div className="new">
        <div className="newtext">
          <p>New to Amazon?</p>
        </div>
        <NavLink to="/signup" className="create-account">
          <button className="create">Create an Account</button>
        </NavLink>
      </div>
    </>
    </div>
  );
}

export default LoginFormModal;
