import "./CompletePurchase.css";
import React from "react";
import logo from "../../img/amazinglogoblack.png";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import { useState } from "react";
import Confetti from "react-confetti";

function CompletePurchase() {
  const user = useSelector((state) => state.session.user);
  const history = useHistory();
  const [hasRun, setHasRun] = useState(false);


  const handleReturnHome = () => {
    history.push("/");
  };

  const viewOrder = () => {
    history.push("/purchases");
  };

    return (
      <div className="main-content">
        <div className="content-area">
      <div className="complete-container">
        {!hasRun && (
          <Confetti
            width={4096}
            height={2160}
            tweenDuration={1000}
            numberOfPieces={1000}
            recycle={false}
            // run={isConfettiActive}
          />
        )}
      <img src={logo} alt="Logo" className="complete-logo" />
      <h2 className="complete-heading">
        Thank you for shopping with us {user?.firstName}!
      </h2>
      <h4>Your items have been successfully purchased</h4>
      <p>
        You have five minutes to make any last minute changes to your order.
      </p>
      <div className="buttons-container2">
        <button className="complete-button-complete" onClick={handleReturnHome}>
          Return Home
        </button>
        <button className="complete-button-complete" onClick={viewOrder}>
          View Purchases
        </button>
      </div>
    </div>
    </div>
    </div>
  );
}

export default CompletePurchase;
