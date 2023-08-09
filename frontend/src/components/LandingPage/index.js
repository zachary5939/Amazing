import "./LandingPage.css"
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as products from '../../store/products';


function LandingPage() {
    const user = useSelector((state) => state.session.user);


    return (
        <div>
            <p>hi</p>
        </div>
    )
}


export default LandingPage;
