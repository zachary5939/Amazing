import './CompletePurchase.css'
import React from 'react';
import logo from "../../img/amazinglogoblack.png";
import { useSelector } from 'react-redux';

function CompletePurchase() {
    const sessionUser = useSelector(state => state.session.user);
    return (
        <div>
            <h2>Thank you for shopping with us!</h2>
        </div>
    );
}

export default CompletePurchase;
