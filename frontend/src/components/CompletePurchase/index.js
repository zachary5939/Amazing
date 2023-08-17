import './CompletePurchase.css'
import React from 'react';
import logo from "../../img/amazinglogoblack.png";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';

function CompletePurchase() {
    const user = useSelector((state) => state.session.user);
    const history = useHistory()

    const handleReturnHome = () => {
        history.push("/")
    }

    return (
        <div className="complete-container">
            <h2 className="complete-heading">Thank you for shopping with us {user?.firstName}!</h2>
            <img src={logo} alt="Logo" className="complete-logo" />
            <button className="complete-button" onClick={handleReturnHome}>Return Home</button>
        </div>
    );
}

export default CompletePurchase;
