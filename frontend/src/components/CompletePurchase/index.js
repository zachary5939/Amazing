import "./CompletePurchase.css";
import React from "react";
import logo from "../../img/amazinglogoblack.png";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";

function CompletePurchase() {
  const user = useSelector((state) => state.session.user);
  const history = useHistory();

  const handleReturnHome = () => {
    history.push("/");
  };

  const viewOrder = () => {
    history.push("/purchases");
  };

  return (
      <div className="complete-container">
        <img src={logo} alt="Logo" className="complete-logo" />
      <h2 className="complete-heading">
        Thank you for shopping with us {user?.firstName}!
      </h2>
      <p>Your items have been successfully purchased</p>
      <div className="buttons-container2">
        <button className="complete-button" onClick={handleReturnHome}>
          Return Home
        </button>
        <button className="complete-button" onClick={viewOrder}>
          View Purchases
        </button>
      </div>
    </div>
  );
}

export default CompletePurchase;
