import "./LandingPage.css";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsByCategory } from "../../store/products";
import logo from "../../img/amazinglogoblack.png";

function LandingPage() {
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleProductClick = async (categoryId) => {
        await dispatch(fetchProductsByCategory(categoryId));
        history.push(`/products/category/${categoryId}`);
    };

    return (
        <div className="home-container">
            <div className="splash-screen">
                <img src={logo} alt="Amazing Logo" className="logo-image2" />
                <h1 className="product-title">The all new Echo Show</h1>
            </div>
            <div className="product-container">
                <div className="square" onClick={() => handleProductClick(1)}>
                    <img src="" alt="Product 1" />
                    <h2>Electronics</h2>
                </div>
                <div className="square" onClick={() => handleProductClick(2)}>
                    <img src="" alt="Product 2" />
                    <h2>Entertainment</h2>
                </div>
                <div className="square" onClick={() => handleProductClick(3)}>
                    <img src="" alt="Product 3" />
                    <h2>Home Goods</h2>
                </div>
                <div className="square" onClick={() => handleProductClick(4)}>
                    <img src="" alt="Product 4" />
                    <h2>Grocery</h2>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;
