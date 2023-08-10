import "./LandingPage.css"
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as products from '../../store/products';
import * as sessionActions from '../../store/session';
import logo from "../../img/amazinglogoblack.png";



function LandingPage() {
    const user = useSelector((state) => state.session.user);


    return (
        <div className="home-container">
            <div className="splash-screen">
            <img src={logo} alt="Amazing Logo" className="logo-image" />
            <h1 className="product-title">The all new Echo Show</h1>
            </div>
            <div className="product-container">
                <div className="left-2">
                    <h2>Electronics</h2>
                </div>
                <div className="right-2">
                </div>
            </div>
        </div>
    )
}


export default LandingPage;
