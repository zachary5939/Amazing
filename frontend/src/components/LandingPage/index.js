import "./LandingPage.css";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsByCategory } from "../../store/products";
import logo from "../../img/echoshow.png";
import electronics from "../../img/P1.jpg";
import enterainment from "../../img/p2.png";
import home from "../../img/p3.png";
import food from "../../img/p4.png";

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
                <img src={logo} alt="The all new echo show. Video call with friends and family." className="logo-image2" />
            </div>
            <div className="product-container">
                <div className="square" onClick={() => handleProductClick(1)}>
                    <img src={electronics} alt="Product 1" />
                    <h2>Electronics</h2>
                </div>
                <div className="square" onClick={() => handleProductClick(2)}>
                    <img src={enterainment} alt="Product 2" />
                    <h2>Entertainment</h2>
                </div>
                <div className="square" onClick={() => handleProductClick(3)}>
                    <img src={home} alt="Product 3" />
                    <h2>Home Goods</h2>
                </div>
                <div className="square" onClick={() => handleProductClick(4)}>
                    <img src={food} alt="Product 4" />
                    <h2>Grocery</h2>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;
